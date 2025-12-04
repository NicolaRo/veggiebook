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

  return (
    //Imposto il timer e le sue componenti icona, tempo e bottone

    //versione compatta
    <div className="recipe-timer-container">
      {!isExpanded ? (
        <div className="timer-compact">
          {/*icona timer */}
          <div className="timer-icon">
            <img
              src="/img/stopwatch-icon.png"
              alt="timer"
              className="timer-icon"
            />
          </div>

          {/* display timer */}
          {/*utilizza la funzione helper per formattare il tempo in secondi */}
          <div className="time-display">{formatTime(seconds)}</div>

          {/* Bottone espandi */}
          <button
            className="timer-expand-button"
            // Al click attiva la versione estesa del componente
            onClick={() => setIsExpanded(true)}
          >
            <img
              src="/img/start-stopwatch-icon.png"
              alt="avvia il cronometro"
              className="timer-icon"
            />
          </button>
        </div>
      ) : (
        //Versione estesa
        <div className="timer-extended">
          <h4>⏱️ Timer Ricetta</h4>

          {/* Toggle modalità */}
          <div className="timer-mode-toggle">
            {hasTimer && ( // ← Mostra countdown SOLO se disponibile
              <button onClick={() => setTimerMode("countdown")}>
                ⏱ Countdown ({totalMinutes} min)
              </button>
            )}
            <button onClick={() => setTimerMode("stopwatch")}>
              ⏲ Cronometro
            </button>
          </div>

          {/* Display tempo grande */}
          <div className="time-display-large">{formatTime(seconds)}</div>

          {/* Controlli */}
          <div className="timer-controls">
            <button className="timer-play-button">▶️ Avvia</button>
            <button className="timer-pause-button">⏸️ Pausa</button>
            <button className="timer-reset-button">🔄 Reset</button>
          </div>

          <button
            className="timer-collapse-button"
            onClick={() => setIsExpanded(false)}
          >
            Nascondi ▲
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeTimer;
