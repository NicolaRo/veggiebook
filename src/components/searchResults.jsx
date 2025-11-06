import { RecipeCard } from "./randomRecipes"; //Importo la struttura della card da RandomRecipes così ottimizzo il codice evitando ripetizioni

function SearchResults({ results, onViewRecipe }) { // Props
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