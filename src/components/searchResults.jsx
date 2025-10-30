import { RecipeCard } from "./randomRecipes"; //Importo la struttura della card da RandomRecipes così ottimizzo il codice evitando ripetizioni

function SearchResults({ results }) {
  return (
    <div>
      {results.map(recipe => <RecipeCard recipe={recipe} />)}
    </div>
  );
}

export default SearchResults;