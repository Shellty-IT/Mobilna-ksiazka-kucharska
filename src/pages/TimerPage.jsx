import { useEffect, useRef, useState } from "react";

const storageKey = "cookbook-timer-end";
const format = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
const getStoredEnd = () => Number(localStorage.getItem(storageKey)) || 0;
const secondsUntil = (end) => Math.max(0, Math.ceil((end - Date.now()) / 1000));

export function TimerPage() {
  const initialEnd = getStoredEnd();
  const [minutes, setMinutes] = useState(10);
  const [remaining, setRemaining] = useState(() => secondsUntil(initialEnd));
  const [running, setRunning] = useState(() => secondsUntil(initialEnd) > 0);
  const endTime = useRef(initialEnd);

  useEffect(() => {
    if (!running) return undefined;
    const tick = () => {
      const next = secondsUntil(endTime.current);
      setRemaining(next);
      if (next === 0) {
        setRunning(false);
        localStorage.removeItem(storageKey);
      }
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [running]);

  const start = () => {
    const value = Math.min(180, Math.max(1, Number(minutes) || 1)) * 60;
    endTime.current = Date.now() + value * 1000;
    localStorage.setItem(storageKey, String(endTime.current));
    setRemaining(value);
    setRunning(true);
  };
  const stop = () => {
    localStorage.removeItem(storageKey);
    setRunning(false);
    setRemaining(0);
  };

  return (
    <main className="timer-page section-wrap">
      <section className="timer-intro">
        <p className="eyebrow">Kuchenny minutnik</p>
        <h1>Ustaw rytm<br /><i>gotowania.</i></h1>
        <p>Odliczanie jest zapamiętywane w przeglądarce, więc możesz przejść do przepisu i wrócić bez utraty ustawionego czasu.</p>
        <div className="timer-presets" aria-label="Szybki wybór czasu">
          {[5, 10, 15, 30].map((value) => <button type="button" key={value} onClick={() => setMinutes(value)} disabled={running}>{value} min</button>)}
        </div>
      </section>
      <section className="timer-card">
        <label htmlFor="minutes">Czas w minutach</label>
        <input id="minutes" type="number" min="1" max="180" value={minutes} onChange={(event) => setMinutes(event.target.value)} disabled={running} inputMode="numeric" />
        <output aria-live="polite" aria-label={`${remaining} sekund do końca`}>{remaining ? format(remaining) : "00:00"}</output>
        <p role="status">{running ? "Odliczanie trwa" : "Wybierz czas i rozpocznij."}</p>
        <div className="timer-actions">
          <button className="button button-primary" type="button" onClick={start} disabled={running}>Start</button>
          <button className="button button-quiet" type="button" onClick={stop} disabled={!running && !remaining}>Zatrzymaj</button>
        </div>
      </section>
    </main>
  );
}
