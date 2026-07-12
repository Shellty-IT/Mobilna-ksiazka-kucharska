import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import sampleData from "../example.json";

const productCollections = ["vegetables", "pasta", "groats", "other"];
const expectedCategories = [
  "warzywa",
  "strączki",
  "mięso i ryby",
  "nabiał",
  "spiżarnia",
  "sosy",
  "zioła i dodatki",
  "owoce",
  "pozostałe",
];

function expectLocalWebp(imagePath) {
  expect(imagePath).toMatch(/^\/images\/.+\.webp$/);
  const file = readFileSync(resolve(process.cwd(), "public", imagePath.replace(/^\//, "")));
  expect(file.subarray(0, 4).toString("ascii")).toBe("RIFF");
  expect(file.subarray(8, 12).toString("ascii")).toBe("WEBP");
}

describe("catalog images", () => {
  it("provides a local WebP for every ingredient category", () => {
    expect(sampleData.ingredientCategories.map(({ id }) => id)).toEqual(expectedCategories);
    sampleData.ingredientCategories.forEach(({ image }) => expectLocalWebp(image));
  });

  it("provides a local main WebP for every product", () => {
    const products = productCollections.flatMap((collection) => sampleData[collection]);
    expect(products).toHaveLength(29);
    products.forEach(({ image }) => expectLocalWebp(image));
  });
});
