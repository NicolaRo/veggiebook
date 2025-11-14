// File principale in cui vive tutta l'App
// Importo i componenti necessari
import React from "react";
import "./style/main.scss";
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
import {
  getCachedRandomRecipe,
  getCachedSearch,
  getCachedRecipeDetails,
} from "./services/apiCache";

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

  // Funzione per caricare 3 ricette random con cache
  useEffect(() => {
    getCachedRandomRecipe(getRandomAppetizer, "randomAppetizer").then((data) =>
      setAppetizer(data.recipes[0])
    );

    getCachedRandomRecipe(getRandomMaincourse, "randomMaincourse").then(
      (data) => setMaincourse(data.recipes[0])
    );

    getCachedRandomRecipe(getRandomDessert, "randomDessert").then((data) =>
      setDessert(data.recipes[0])
    );
  }, []);

  // Funzione che gestisce la ricerca con cache
  async function handleSearch(query) {
    setIsLoading(true);
    try {
      const results = await getCachedSearch(searchRecipes, query);
      setSearchResults(results);
      console.log("Risultati trovati:", results);
    } catch (error) {
      console.error("Errore nella ricerca:", error);
      alert("Errore durante la ricerca. Riprova.");
    } finally {
      setIsLoading(false);
    }
  }

  // Funzione per visualizzare dettagli ricetta con cache
  async function handleViewRecipe(id) {
    try {
      const details = await getCachedRecipeDetails(getRecipeDetails, id);
      setSelectedRecipe(details);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Errore nel caricamento dei dettagli:", error);
    }
  }

  return (
    <React.Fragment>
      <div className="App">
            <div className="logo-container">
              <img
                className="logo-veggiebook"
                src="/img/VeggieBook-logo.png"
                alt="logo Veggie Book"
              ></img>
              <h1>🥗 VeggieBook 🥙</h1>
            </div>

            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            <div className="random-recipes-header">
              <h3>Cerchi ispirazione?👩🏻‍🍳</h3>
            </div>

            <RandomRecipes
              appetizer={appetizer}
              maincourse={maincourse}
              dessert={dessert}
              onViewRecipe={handleViewRecipe}
            />

            {searchResults.length > 0 && (
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
      <div className="footer">
        <p className="footer-signature">
          Disegnato e sviluppato da <strong>NicoDesign®</strong>
        </p>
        <div className="container-socials">
          <a href="https://nicolaro.github.io/" target="_blank" rel="noopener noreferrer">
            <img
              src="img/social-icon/Portfolio-Nicola-Logo.png"
              className="social-icon" 
              id="portfolio-logo" 
              alt="Nicola Rossi DevPortfolio"/>
          </a>
          <a href="https://github.com/NicolaRo" target="_blank" rel="noopener noreferrer">
            <img 
              src="img/social-icon/Github-Logo-Black.png"
              className="social-icon" 
              id="github-logo" 
              alt="Nicola Rossi GitHub profile"/>
          </a>
          <p>
          | & |
          supportato dal servizio API di <a href="https://spoonacular.com/food-api">Spoonacular</a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
