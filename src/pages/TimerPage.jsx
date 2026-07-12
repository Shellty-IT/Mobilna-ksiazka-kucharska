import { useEffect, useRef, useState } from "react";

const format = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

export function TimerPage() {
  const [minutes, setMinutes] = useState(10);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const endTime = useRef(null);
  useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((endTime.current - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0) { setRunning(false); window.clearInterval(interval); }
    }, 250);
    return () => window.clearInterval(interval);
  }, [running]);
  const start = () => { const value = Math.max(1, Number(minutes) || 1) * 60; endTime.current = Date.now() + value * 1000; setRemaining(value); setRunning(true); };
  const stop = () => { setRunning(false); setRemaining(0); };
  return <main className="timer-page section-wrap"><section className="timer-intro"><p className="eyebrow">Kuchenny minutnik</p><h1>Ustaw rytm<br /><i>gotowania.</i></h1><p>Minutnik działa niezależnie od bieżącego widoku aplikacji, dopóki karta pozostaje otwarta.</p></section><section className="timer-card"><label htmlFor="minutes">Czas w minutach</label><input id="minutes" type="number" min="1" max="180" value={minutes} onChange={(event) => setMinutes(event.target.value)} disabled={running} /><output aria-live="polite">{remaining ? format(remaining) : "00:00"}</output><p>{running ? "Odliczanie trwa" : remaining === 0 ? "Wybierz czas i rozpocznij." : "Minutnik zatrzymany."}</p><div className="timer-actions"><button className="button button-primary" type="button" onClick={start} disabled={running}>Start</button><button className="button button-quiet" type="button" onClick={stop} disabled={!running && !remaining}>Zatrzymaj</button></div></section></main>;
}
