import React, { useEffect, useRef, useState } from 'react';

export default function WorkoutTracker() {
  const [sets, setSets] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('workout_history') || '[]'); } catch { return []; }
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    try { localStorage.setItem('workout_history', JSON.stringify(history)); } catch {}
  }, [history]);

  const completeSet = () => {
    const time = new Date();
    const entry = { set: sets + 1, duration: timer, at: time.toLocaleString() };
    setHistory((h) => [entry, ...h]);
    setSets((s) => s + 1);
    setTimer(0);
    setRunning(false);
  };

  const clearHistory = () => {
    if (!window.confirm('Clear workout history?')) return;
    setHistory([]);
  };

  return (
    <div className="card">
      <h2>Workout Tracker</h2>
      <div className="workout-grid">
        <div>
          <p>Sets Completed: <strong>{sets}</strong></p>
          <p>Timer: <strong>{timer}s</strong></p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button className="btn" onClick={() => setRunning((r) => !r)}>{running ? '⏸ Stop' : '▶ Start'}</button>
          <button className="btn warn" onClick={completeSet}> Complete Set</button>
        </div>
      </div>

      <h3 style={{ marginTop:18 }}>History</h3>
      <div style={{ marginTop:8 }}>
        <button onClick={clearHistory} style={{ marginBottom:10 }}>Clear History</button>
        <ul className="history-list">
          {history.length === 0 && <li style={{ opacity:0.7 }}>No history yet</li>}
          {history.map((h, i) => (
            <li key={i}>Set {h.set} — {h.duration}s — {h.at}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
