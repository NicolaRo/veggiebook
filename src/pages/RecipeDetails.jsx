  import { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import { getRecipeDetails } from "../services/api";
  import { getCachedRecipeDetails } from "../services/apiCache";
  import RecipeTimer from "../components/RecipeTimer";
  import ShareRecipe from "../components/ShareRecipe";

  export function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div className="recipe-detail-titol">
          <h2>{recipe.title}</h2>
        </div>

        <div className="img-share-container">
        <img
          className="recipe-detail-immagine"
          src={recipe.image}
          alt="foto della ricetta"
        />
        <ShareRecipe recipe={recipe}/>
        </div>

        

        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: recipe.summary || "Nessuna descrizione disponibile.",
          }}
        />

        <h6 className="section-header">Menu:</h6>
        <div className="container-bottoni">
        <button
  className={`menu-button ${showIngredients ? "active" : ""}`}
  onClick={() => setShowIngredients(!showIngredients)}
>
  <img
    className="menu-icon"
    src="/img/ingredients-icon.png"
    alt="icona ingredienti"
  />
  <span>{showIngredients ? "Nascondi" : "Ingredienti"}</span>
</button>

<button
  className={`menu-button ${showInstructions ? "active" : ""}`}
  onClick={() => setShowInstructions(!showInstructions)}
>
  <img
    className="menu-icon"
    src="/img/instructions-icon.png"
    alt="icona preparazione"
  />
  <span>{showInstructions ? "Nascondi" : "Preparazione"}</span>
</button>

<button
  className={`menu-button ${showConservation ? "active" : ""}`}
  onClick={() => setShowConservation(!showConservation)}
>
  <img
    className="menu-icon"
    src="/img/preserve-food-icon.png"
    alt="icona conservazione"
  />
  <span>{showConservation ? "Nascondi" : "Conservazione"}</span>
</button>

        </div>

        {/* Ingredienti */}
        <div className={`collapsible ${showIngredients ? "open" : ""}`}>
          <h6 className="section-header">Ingredienti:</h6>
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

        {/* Preparazione + Timer */}
        <div className={`collapsible ${showInstructions ? "open" : ""}`}>
          <h6 className="section-header">Come lo preparo:</h6>

          <div
            className="preparazione"
            dangerouslySetInnerHTML={{
              __html: recipe.instructions || "N/A",
            }}
          />
          <RecipeTimer totalMinutes={recipe.readyInMinutes} />
        </div>

        {/* Conservazione */}
        <div className={`collapsible ${showConservation ? "open" : ""}`}>
          <h6 className="section-header">Come conservare:</h6>
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
