import { RecipeCard } from "./RandomRecipes.jsx"; //Importo la struttura della card da RandomRecipes così ottimizzo il codice evitando ripetizioni

function SearchResults({ results, onViewRecipe }) { // Props

  // Se non ci sono risultati, mostra messaggio
  if (results.length === 0) {
    return (
      <div className="no-results-container">
        <div className="no-results-content">
          <img 
            src="/img/empty-cart.png"
            alt="Nessun risultato"
            className="no-results-icon"
          />
          <h3>Nessuna ricetta trovata 😔</h3>
          
          <p>Prova con un altro termine di ricerca o esplora le ricette suggerite!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      {results.map(recipe => (
        <RecipeCard 
          key={recipe.id}
          recipe={recipe} 
          styleType="search"
          onViewRecipe={onViewRecipe}  // Passo la funzione
        />
      ))}
    </div>
  );
}

export default SearchResults;