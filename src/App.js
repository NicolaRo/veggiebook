// File principale in cui vive tutta l'App
// Importo i componenti necessari
import "./style/App.scss";
import SearchResults from "./components/searchResults.jsx";

import {
  getRandomAppetizer,
  getRandomMaincourse,
  getRandomDessert,
  searchRecipes,
  getRecipeDetails,
} from "./services/api";

import { useEffect, useState } from "react";
import { SearchBar } from "./components/searchbar";
import { RandomRecipes } from "./components/randomRecipes.jsx";
import SelectedRecipeModal from "./components/SelectedRecipeModal.jsx";


function App() {
  // Stati per le 3 ricette random
  const [appetizer, setAppetizer] = useState(null);
  const [maincourse, setMaincourse] = useState(null);
  const [dessert, setDessert] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Nuovo stato per i risultati della ricerca
  const [searchResults, setSearchResults] = useState([]);

  // Nuovo stato per il loading
  const [isLoading, setIsLoading] = useState(false);

  // Carica le 3 ricette random all'avvio
  useEffect(() => {
    getRandomAppetizer().then((data) => setAppetizer(data.recipes[0]));
    getRandomMaincourse().then((data) => setMaincourse(data.recipes[0]));
    getRandomDessert().then((data) => setDessert(data.recipes[0]));
  }, []);

  // Funzione che gestisce la ricerca
  async function handleSearch(query) {
    setIsLoading(true); // Attiva loading
    try {
      const results = await searchRecipes(query); // Chiama API
      setSearchResults(results); // Salva risultati
      console.log("Risultati trovati:", results);

    } catch (error) {
      console.error("Errore nella ricerca:", error);
      alert("Errore durante la ricerca. Riprova.");
    } finally {
      
      setIsLoading(false); // Disattiva loading (sempre, anche se c'è errore)
    }
  }

  async function handleViewRecipe(id) {
    try {
      const details = await getRecipeDetails(id);
      setSelectedRecipe(details); // Ottengo i "details" ovvero la ricetta
      setIsModalOpen(true); // Apro il modale per visualizzarla
    } catch (error) {
      console.error("Errore nel caricamento dei dettagli:", error);
    }
  }

  return (
    <div className="App">
      <h1>🥗 VeggieBook 🥙</h1>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      <RandomRecipes
        appetizer={appetizer}
        maincourse={maincourse}
        dessert={dessert}
        onViewRecipe={handleViewRecipe}
      />

      {searchResults.length > 0 && ( // Array condizionale -> SE l'array ha elementi, ALLORA mostra "SearchResults"
        <SearchResults
          results={searchResults}
          onViewRecipe={handleViewRecipe}
        />
      )}
      {isModalOpen && selectedRecipe && (
  <SelectedRecipeModal
    recipe={selectedRecipe}
    onClose={() => setIsModalOpen(false)}
  />
)}

    </div>
  );
}

export default App;
