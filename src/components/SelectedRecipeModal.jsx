import React, { useState } from "react";

// Creo una funzione con le props "recipe" ed "onClose" per gestire il modale
export function SelectedRecipeModal({ recipe, onClose }) {
  // Creo le variabili di stato per le sezioni collassabili
  const [showIngredients, setShowIngredients] = useState(false);
  const [showConservation, setShowConservation] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Con "return" visualizzo il modale con la ricetta selezionata dall'utente
  return (
    // Creo un contenitore unico per farlo vivere all'interno del modale
    <div className="contenitore-principale">
      {/* Bottone per chiudere il modale */}
      <div className="bottone-chiusura-modale">
        <button onClick={onClose}>Chiudi</button>
      </div>

      {/* Titolo della ricetta selezionata */}
      <div className="titolo-ricetta-modale">
        <h2>{recipe.title}</h2>
      </div>

      {/* Immagine della ricetta selezionata */}
      <div className="immagine-ricetta-modale">
        <img src={recipe.image} alt="foto della ricetta" />
      </div>

      {/* Contenitore della descrizione della ricetta */}
      <section className="description">
        <div
          dangerouslySetInnerHTML={{
            __html: recipe.summary || "Nessuna descrizione disponibile.",
          }}
        />
      </section>

      {/* Contenitore collassabile per la lista degli ingredienti */}
      <div className="contenitore-ingredienti">
        <section>
          <div className="bottone-ingredienti-collassabile">
            <button onClick={() => setShowIngredients(!showIngredients)}>
              {showIngredients
                ? "Nascondi Ingredienti"
                : "Lista Ingredienti"}
            </button>
          </div>

          {showIngredients && (
            <ul>
              {recipe.extendedIngredients?.map((item) => (
                <li key={item.id}>
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                    alt={item.name}
                  />
                  {item.original}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Contenitore per la guida di preparazione (collassabile) */}
      <section className="preparazione">
        <button onClick={() => setShowInstructions(!showInstructions)}>
          {showInstructions
            ? "Nascondi Preparazione"
            : "Mostra guida alla Preparazione"}
        </button>
        {showInstructions && (
          <div
            dangerouslySetInnerHTML={{
              __html: recipe.instructions || "N/A",
            }}
          />
        )}
      </section>

      {/* Contenitore collassabile per la conservazione */}
      <section className="conservazione">
        <button onClick={() => setShowConservation(!showConservation)}>
          {showConservation ? "Nascondi Conservazione" : "Conservazione"}
        </button>
        {showConservation && (
          <p>
            Conserva in frigorifero per massimo 2 giorni in contenitore
            ermetico. (testo segnaposto)
          </p>
        )}
      </section>
    </div>
  );
}

export default SelectedRecipeModal;
