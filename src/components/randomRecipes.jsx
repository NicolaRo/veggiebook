
// Import dei dati che arrivano dal componente padre (App.js)
// Non serve importare API qui, perché le chiamate sono già fatte in App.js
// Qui riceviamo solo i 3 oggetti come props
// E renderizziamo i risultati
function RandomRecipes({ appetizer, maincourse, dessert }) {

  // Se i dati non sono ancora pronti (es. durante il caricamento), mostriamo un messaggio
  if (!appetizer || !maincourse || !dessert) {
    return <p>Caricamento ricette...</p>;
  }

  // Quando tutto è pronto, mostriamo le 3 card
  return (
    <div className="random-recipes-container">
      {/* Ogni componente RecipeCard riceve un oggetto "recipe" come prop */}
      <RecipeCard recipe={appetizer} styleType="random"/>
      <RecipeCard recipe={maincourse} styleType="random"/>
      <RecipeCard recipe={dessert} styleType="random"/>
    </div>
  );
}

// 🔹 Componente per mostrare una singola ricetta
function RecipeCard({ recipe, styleType = "random" }) {
  return (
    <div className={`recipe-card recipe-card--${styleType}`}>
      <img
        src={recipe.image}
        alt={recipe.title}
        className={`recipe-image recipe-image--${styleType}`}
      />
      <h3 className={`recipe-title recipe-title--${styleType}`}>
        {recipe.title}
      </h3>
      <p className={`recipe-time recipe-time--${styleType}`}>
        ⏱️ {recipe.readyInMinutes} minuti
      </p>
      <button className={`recipe-button recipe-button--${styleType}`}>
        Vedi ricetta
      </button>
    </div>
  );
}

// Esporto i componenti per riutilizzarli poi anche per visualizzare i risultati della ricerca utente.
export { RandomRecipes, RecipeCard };
