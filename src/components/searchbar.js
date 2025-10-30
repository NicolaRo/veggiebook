import "../style/App.scss"
import { useState } from "react";  // Importo ed imposto lo useState

export function SearchBar({ onSearch, isLoading }) {
  // Inserisco lo stato prima del "rerturn"
  const [searchInput, setSearchInput] = useState("");
  
  return (
    <div className="searchbar-container">
      <input 
        className="search-bar" 
        placeholder="Cerca qui la tua ricetta" 
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}  // Aggiorno lo stato
      />
      <button 
        className="search-button" 
        onClick={() => onSearch(searchInput)}  // Passo il valore a "onSearch"
      >
        Cerca
      </button>
    </div>
  );
}




/* function searchResults({ }) {

  // Se i dati non sono ancora pronti (es. durante il caricamento), mostriamo un messaggio
  if (!searchResults) {
    return <p>Caricamento ricette...</p>;
  }

  // Quando tutto è pronto, mostriamo la card
  return (
    <div className="user-found-recipe-container">
      {/* Ogni componente RecipeCard riceve un oggetto "recipe" come prop */
     /*  <RecipeCard recipe={searchResults} />
    </div>
  ); 
} */