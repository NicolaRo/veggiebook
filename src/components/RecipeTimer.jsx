import { useState, useEffect } from "react";

//Creo un timer per consentire di preparare la ricetta senza dover cambiare schermata
//Funzione per gestire il componente timer
//Tipologia toggle (espande e contrae il componente in base alla necessità dell'utente)

function RecipeTimer({ totalMinutes }) {
  //Verifico che sia disponibile il tempo di preparazione
  const hasTimer = totalMinutes && totalMinutes > 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const [timerMode, setTimerMode] = useState("stopwatch"); //Utilizza sempre il cronometro di default
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Funzione helper per formattare i secondi in MM:SS
  function formatTime(totalSeconds) {
    // 1. CALCOLO DEI MINUTI
    // Math.floor() arrotonda per difetto (elimina i decimali)
    // Esempio: 125 secondi / 60 = 2.08... → Math.floor = 2 minuti
    const mins = Math.floor(totalSeconds / 60);

    // 2. CALCOLO DEI SECONDI RIMANENTI
    // L'operatore % (modulo) restituisce il RESTO della divisione
    // Esempio: 125 % 60 = 5 (perché 60*2 = 120, resto 5)
    const secs = totalSeconds % 60;

    // 3. FORMATTAZIONE CON ZERO DAVANTI
    // String(mins) → converte il numero in testo (es. 2 → "2")
    // .padStart(2, '0') → aggiunge zeri a sinistra fino a raggiungere 2 caratteri
    //   Esempio: "2" → "02"  |  "15" → "15" (già 2 cifre)
    // Template literal `${}` → inserisce i valori dentro la stringa
    // Risultato finale: "02:05"
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  // useEffect che fa partire il timer
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (timerMode === "countdown" && prevSeconds <= 0) {
            setIsRunning(false);
            return 0;
          }
          return timerMode === "countdown" ? prevSeconds - 1 : prevSeconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timerMode]);

  // Quando cambi modalità, resetta il timer
  useEffect(() => {
    if (timerMode === "countdown" && hasTimer) {
      setSeconds(totalMinutes * 60);
    } else {
      setSeconds(0);
    }
    setIsRunning(false);
  }, [timerMode, totalMinutes, hasTimer]);

  /*
    
    //////////// Lun 8 12 25 \\\\\\\\\\\\
    function formatTime(totalSeconds) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
    } */

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (timerMode === "countdown" && hasTimer) {
      setSeconds(totalMinutes * 60);
    } else {
      setSeconds(0);
    }
  };

  return (
    <div className="recipe-timer-container">
      {!isExpanded ? (
        <div className="timer-compact">
          
          <button className="timer-icon" onClick={() => setIsExpanded(true)}>
            <img
              src="/img/stopwatch-icon.png"
              alt="timer"
              className="open-timer-button"
            />
            <h6 className="timer-header">Apri il timer:</h6>
          </button>

          {/* <span className="time-display">
                        {formatTime(seconds)}
                    </span> */}
        </div>
      ) : (
        <div className="extended-timer-header">
          <h6 className="timer-title">Timer Ricetta</h6>

          <button
            className="timer-collapse-button"
            onClick={() => setIsExpanded(false)}
          >
            Nascondi timer{" "}
            <img
              src="/img/stopwatch-icon.png"
              alt="timer"
              className="timer-icon"
            />
          </button>

          <div className="timer-mode-toggle">
            {hasTimer && (
              <button
                onClick={() => setTimerMode("countdown")}
                className={timerMode === "countdown" ? "active" : ""}
              >
                <img
                  src="/img/start-stopwatch-icon.png"
                  alt="timer"
                  className="timer-icon"
                />
                Countdown ({totalMinutes} min)
              </button>
            )}
            <button
              onClick={() => setTimerMode("stopwatch")}
              className={timerMode === "stopwatch" ? "active" : ""}
            >
              <img
                src="/img/stopwatch.png"
                alt="timer"
                className="timer-icon"
              />
              Cronometro
            </button>
          </div>

          <div className="time-display-large">{formatTime(seconds)}</div>

          <div className="timer-controls">
            <button onClick={handlePlayPause} className="play-pause-button">
              <img
                src={
                  isRunning
                    ? "/img/pause-timer-icon.png"
                    : "/img/start-timer-icon.png"
                }
                alt={isRunning ? "Pausa" : "Avvia"}
                className="timer-icon"
              />
              <span>{isRunning ? "Pausa" : "Avvia"}</span>
            </button>
            <button onClick={handleReset}>
              <img
                src="/img/timer-reset-icon.png"
                alt="timer"
                className="timer-icon"
              />
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeTimer;
