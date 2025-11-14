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
    <div className="overlay-modale">
      <div className="contenitore-principale">
        {/* Bottone per chiudere il modale */}
        <div>
          <button className="bottone-chiudi-modale"  
            onClick={onClose}>
            Chiudi
          </button>
        </div>

        {/* Titolo della ricetta selezionata */}
        <div className="titolo-ricetta-modale">
          <h2>{recipe.title}</h2>
        </div>

        {/* Immagine della ricetta selezionata */}
        <div>
          <img
            className="immagine-ricetta-modale"
            src={recipe.image}
            alt="foto della ricetta"
          />
        </div>

        {/* Contenitore della descrizione della ricetta */}
        <section>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: recipe.summary || "Nessuna descrizione disponibile.",
            }}
          />
        </section>

        {/* Contenitore collassabile per la lista degli ingredienti */}
        <div>
          <section>
            <div className="container-bottoni">
              <button
                className="bottone-mostra-ingredienti"
                onClick={() => setShowIngredients(!showIngredients)}
              >
                {showIngredients ? "Nascondi Ingredienti" : "Lista Ingredienti"}
              </button>
              <button
            className="bottone-preparazione"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            {showInstructions
              ? "Nascondi Preparazione"
              : "Mostra Preparazione"}
          </button>
          <button
            className="bottone-mostra-conservazione"
            onClick={() => setShowConservation(!showConservation)}
          >
            {showConservation ? "Nascondi Conservazione" : "Conservazione"}
          </button>
            </div>

            {showIngredients && (
              <ul className="container-ingredienti">
                {recipe.extendedIngredients?.map((item) => (
                  <li className="card-ingrediente" key={item.id}>
                    <img className="immagine-ingrediente"
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
          
          {showConservation && (
            <p>
              Conserva in frigorifero per massimo 2 giorni in contenitore
              ermetico.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default SelectedRecipeModal;
