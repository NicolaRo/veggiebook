import { useState, useEffect } from "react";

function TimerButton({ icon, alt, label, active, onClick }) {
  return (
    <button
      className={`timer-btn ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <img src={icon} alt={alt} className="timer-btn-icon" />
      <span>{label}</span>
    </button>
  );
}

function RecipeTimer({ totalMinutes }) {
  const hasTimer = totalMinutes > 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const [timerMode, setTimerMode] = useState("stopwatch");
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (timerMode === "countdown" && prev <= 0) {
            setIsRunning(false);
            return 0;
          }
          return timerMode === "countdown" ? prev - 1 : prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerMode]);

  useEffect(() => {
    setSeconds(timerMode === "countdown" && hasTimer ? totalMinutes * 60 : 0);
    setIsRunning(false);
  }, [timerMode, totalMinutes, hasTimer]);

  return (
    <div className="recipe-timer-container">
      {!isExpanded ? (
        <button className="timer-compact" onClick={() => setIsExpanded(true)}>
          <img className="apri-timer-icon" src="/img/stopwatch-icon.png" alt="Apri timer" />
          <span>Apri il timer</span>
        </button>
      ) : (
        <div className="extended-timer">
          <h6 className="timer-title">Timer Ricetta</h6>

          <button
            className="timer-collapse-btn"
            onClick={() => setIsExpanded(false)}
          >
            <img className="chiudi-timer-icon" src="/img/stopwatch-icon.png" alt="Chiudi timer" />
            <span>Nascondi timer</span>
          </button>

          <div className="timer-mode-toggle">
            {hasTimer && (
              <TimerButton
                icon="/img/start-stopwatch-icon.png"
                alt="Countdown"
                label={`Countdown (${totalMinutes} min)`}
                active={timerMode === "countdown"}
                onClick={() => setTimerMode("countdown")}
              />
            )}
            <TimerButton
              icon="/img/stopwatch.png"
              alt="Cronometro"
              label="Cronometro"
              active={timerMode === "stopwatch"}
              onClick={() => setTimerMode("stopwatch")}
            />
          </div>

          <div className="time-display-large">{formatTime(seconds)}</div>

          <div className="timer-controls">
            <TimerButton
              icon={isRunning ? "/img/pause-timer-icon.png" : "/img/start-timer-icon.png"}
              alt={isRunning ? "Pausa" : "Avvia"}
              label={isRunning ? "Pausa" : "Avvia"}
              onClick={() => setIsRunning(!isRunning)}
            />
            <TimerButton
              icon="/img/timer-reset-icon.png"
              alt="Reset"
              label="Reset"
              onClick={() => setSeconds(timerMode === "countdown" ? totalMinutes * 60 : 0)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeTimer;
