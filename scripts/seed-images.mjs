import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const data = JSON.parse(readFileSync(resolve(projectRoot, "src/example.json"), "utf8"));
const collectionNames = ["ingredientCategories", "vegetables", "pasta", "groats", "other"];
const expectedCounts = { ingredientCategories: 9, vegetables: 13, pasta: 9, groats: 5, other: 2 };

function loadEnvironmentFile(filename) {
  const path = resolve(projectRoot, filename);
  if (!existsSync(path)) return;

  readFileSync(path, "utf8").split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!match || match[1] in process.env) return;
    process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
  });
}

function validateSeed() {
  for (const collection of collectionNames) {
    const records = data[collection];
    if (!Array.isArray(records) || records.length !== expectedCounts[collection]) {
      throw new Error(`Kolekcja ${collection} powinna zawierać ${expectedCounts[collection]} rekordów.`);
    }

    records.forEach((record) => {
      if (!record.image?.endsWith(".webp")) {
        throw new Error(`Rekord ${collection}/${record.number ?? record.id} nie ma obrazu WebP.`);
      }
      const localPath = resolve(projectRoot, "public", record.image.replace(/^\//, ""));
      if (!existsSync(localPath)) {
        throw new Error(`Brakuje pliku ${record.image}.`);
      }
    });
  }
}

loadEnvironmentFile(".env");
loadEnvironmentFile(".env.seed");
validateSeed();

const payload = Object.fromEntries(collectionNames.map((name) => [name, data[name]]));

if (process.argv.includes("--dry-run")) {
  console.log("Seed jest poprawny:", expectedCounts);
  process.exit(0);
}

const databaseUrl = (
  process.env.FIREBASE_DATABASE_URL
  || process.env.VITE_FIREBASE_DATABASE_URL
  || "https://pomocnik-cc6da-default-rtdb.firebaseio.com"
).replace(/\/$/, "");
const authToken = process.env.FIREBASE_AUTH_TOKEN || process.env.FIREBASE_DATABASE_SECRET;
const accessToken = process.env.FIREBASE_ACCESS_TOKEN;
const endpoint = `${databaseUrl}/.json${authToken ? `?auth=${encodeURIComponent(authToken)}` : ""}`;
const authHeaders = {
  ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
};

function buildCollectionUrl(collection) {
  return `${databaseUrl}/${collection}.json${authToken ? `?auth=${encodeURIComponent(authToken)}` : ""}`;
}

const response = await fetch(endpoint, {
  method: "PATCH",
  headers: {
    "content-type": "application/json",
    ...authHeaders,
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const details = await response.text();
  throw new Error(
    `Firebase odrzucił seed (${response.status}): ${details}\n`
    + "Ustaw FIREBASE_AUTH_TOKEN na sekret bazy lub token dostępu konta z uprawnieniami administracyjnymi.",
  );
}

const verification = await Promise.all(collectionNames.map(async (collection) => {
  const result = await fetch(buildCollectionUrl(collection), {
    headers: authHeaders,
  });
  if (!result.ok) throw new Error(`Nie udało się zweryfikować kolekcji ${collection}.`);
  const records = (await result.json()) || [];
  const items = Array.isArray(records) ? records.filter(Boolean) : Object.values(records);
  const webpCount = items.filter(({ image }) => image?.endsWith(".webp")).length;
  if (items.length !== expectedCounts[collection] || webpCount !== items.length) {
    throw new Error(`Weryfikacja ${collection} nie powiodła się (${items.length} rekordów, ${webpCount} WebP).`);
  }
  return `${collection}: ${items.length}`;
}));

console.log(`Seed zakończony i zweryfikowany: ${verification.join(", ")}.`);
