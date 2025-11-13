//Creo la funzione RandomRecipes che accetta come parametri "appetizer", "maincourse", "dessert" e "onViewRecipe"
// onViewRecipe è una props della funzione SearchResults e serve per visualizzare i risultati della query
function RandomRecipes({ appetizer, maincourse, dessert, onViewRecipe }) {
  if (!appetizer || !maincourse || !dessert) {
    return <p>Caricamento ricette...</p>;
  }
  
  // Faccio "return" con cui renderizzo dentro le "RecipeCard" i risultati della chiamata API per le ricette Random
  return (
    <div className="random-recipes-container">
      <div className="random-recipes-cards-container">
        <RecipeCard recipe={appetizer} styleType="random" onViewRecipe={onViewRecipe} />
        <RecipeCard recipe={maincourse} styleType="random" onViewRecipe={onViewRecipe} />
        <RecipeCard recipe={dessert} styleType="random" onViewRecipe={onViewRecipe} />
      </div>
    </div>
  );
}

// Imposto una funzione per gestire i risultati random all'avvio dell'App (indico quali dati prendere dal responso della API e visualizzarli in quale ordine)

function RecipeCard({ recipe, styleType = "random", onViewRecipe }) {
  return (

    // Creo un contenitore "recipe-card" 
    <div className={`recipe-card recipe-card--${styleType}`}>

      {/* Al primo posto l'immagine*/}
      <img
        src={recipe.image}
        alt={recipe.title}
        className={`recipe-image recipe-image--${styleType}`}
      />

       {/* Poi l'immagine della ricetta */}
      <h3 className={`recipe-title recipe-title--${styleType}`}>
        {recipe.title}
      </h3>

       {/* Il tempo di preparazione */}
      <p className={`recipe-time recipe-time--${styleType}`}>
        ⏱️ {recipe.readyInMinutes} minuti
      </p>

       {/* Un bottone con funzione "onClick" comunicherà ad "api.js" di richiedere i dettagli della rispettiva ricetta */}
      <button 
        className={`recipe-button recipe-button--${styleType}`}
        onClick={() => onViewRecipe(recipe.id)}
      >
        Vedi ricetta
      </button>
    </div>
  );
}

export { RandomRecipes, RecipeCard };