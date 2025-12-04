import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../services/api";
import { getCachedRecipeDetails } from "../services/apiCache";

export function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stati per sezioni collapsible
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showConservation, setShowConservation] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getCachedRecipeDetails(getRecipeDetails, id)
      .then((data) => {
        setRecipe(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Errore nel caricamento");
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <div>Caricamento ricetta...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="recipe-detail-container">
      {/* Titolo */}
      <div className="titolo-ricetta-modale">
        <h2>{recipe.title}</h2>
      </div>

      {/* Immagine */}
      <img
        className="immagine-ricetta-modale"
        src={recipe.image}
        alt="foto della ricetta"
      />

      {/* Descrizione */}
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: recipe.summary || "Nessuna descrizione disponibile.",
        }}
      />

      {/* Bottoni per sezioni */}
      <div className="container-bottoni">
        <button onClick={() => setShowIngredients(!showIngredients)}>
          {showIngredients ? "Nascondi Ingredienti" : "Lista Ingredienti"}
        </button>
        <button onClick={() => setShowInstructions(!showInstructions)}>
          {showInstructions ? "Nascondi Preparazione" : "Mostra Preparazione"}
        </button>
        <button onClick={() => setShowConservation(!showConservation)}>
          {showConservation ? "Nascondi Conservazione" : "Conservazione"}
        </button>
      </div>

      {/* Lista ingredienti collapsible */}
      <div className={`collapsible ${showIngredients ? "open" : ""}`}>
        <ul className="container-ingredienti">
          {recipe.extendedIngredients?.map((item) => (
            <li className="card-ingrediente" key={item.id}>
              <img
                className="immagine-ingrediente"
                src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                alt={item.name}
              />
              {item.original}
            </li>
          ))}
        </ul>
        <div className="scroll-hint">Scorri →</div>
      </div>

      {/* Preparazione collapsible */}
      <div className={`collapsible ${showInstructions ? "open" : ""}`}>
        <div
          className="preparazione"
          dangerouslySetInnerHTML={{
            __html: recipe.instructions || "N/A",
          }}
        />
      </div>

      {/* Conservazione collapsible */}
      <div className={`collapsible ${showConservation ? "open" : ""}`}>
        <div className="conservazione">
          <p>
            Conserva in frigorifero per massimo 2 giorni in contenitore
            ermetico.
          </p>
        </div>
      </div>
    </div>
  );
}
