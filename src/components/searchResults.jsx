import { RecipeCard } from "./randomRecipes"; //Importo la struttura della card da RandomRecipes così ottimizzo il codice evitando ripetizioni

function SearchResults({ results }) {
  return (
    <div className="search-results-container"> {/*Imposto una classe così da poter differenziare e gestirne il design */}
      {results.map(recipe => (
  <RecipeCard 
    recipe={recipe} 
    styleType="search"  // Passo la prop "search" per gestire lo stile senza creare un nuovo componente
  />
))}
    </div>
  );
}

export default SearchResults;