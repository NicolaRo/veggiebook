import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../services/api";
import { getCachedRecipeDetails } from "../services/apiCache";

export function RecipeDetails () {
    
    //Estraggo i dati dall'URL - "useParams()" legge automaticamente dall'URL del browser
    const {id}=useParams();

    // Creo i 3 stati per gestire il caricamento della ricetta
    
    //Qua salvo i dati della ricetta (titolo, immagine, ingredienti ecc..) è "null"
    //perchè verrà popolato in seguito alla chiamata API.
    const [recipe, setRecipe] = useState (null);

    //Qua traccio se la chiamata API è in corso perchè appena il componente si carica,
    //parte la chiamata  --> quindi è "true".
    const [isLoading, setIsLoading] = useState (true);

    //Qua salvo eventuali errori (API non risponde, ricetta non trovata)
    //all'inizio non ci sono errori quindi è null.
    const [error, setError] = useState (null)

    // Aggiungo gli stati per le sezioni collassabili di ciascuna ricetta:

    const [showIngredients, setShowIngredients] = useState(false);
    const [showConservation, setShowConservation] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);


    useEffect(() => {
        //Imposto loading a true per feedback caricamento
        setIsLoading(true);
    
    
        // Effettuo chiamata API chiamando la funzione RecipeDetails che vive dentro ad "api.js"
        getCachedRecipeDetails(getRecipeDetails, id)
            .then((data) =>{
                setRecipe(data);
                setIsLoading(false);
        })
        .catch((err) => {
            setError("Errore nel caricamento");
            setIsLoading(false);
        });
    }, [id]);

    return (
        <div className="recipe-detail-container">
            {isLoading && <div>Caricamento ricetta...</div>}
            {error && <div>{error}</div>}
            {recipe && (
                <div>
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
            )}
        </div>
        );
    }