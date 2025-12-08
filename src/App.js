// File principale in cui vive tutta l'App
// Importo i componenti necessari
import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import "./style/main.scss";
import SearchResults from "./components/SearchResults.jsx";
import {
  getRandomAppetizer,
  getRandomMaincourse,
  getRandomDessert,
  searchRecipes,
} from "./services/api";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/searchbar";
import { RandomRecipes } from "./components/RandomRecipes.jsx";
import {
  getCachedRandomRecipe,
  getCachedSearch,
} from "./services/apiCache";
import { RecipeDetails } from "./pages/RecipeDetails.jsx";

function App() {
  // Stati per le 3 ricette random
  const [appetizer, setAppetizer] = useState(null);
  const [maincourse, setMaincourse] = useState(null);
  const [dessert, setDessert] = useState(null);
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);

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
    setHasSearched(true);
    try {
      const results = await getCachedSearch(searchRecipes, query);
      setSearchResults(results);
      console.log("Risultati trovati:", results);
      navigate("/");
    } catch (error) {
      console.error("Errore nella ricerca:", error);
      alert("Errore durante la ricerca. Riprova.");
    } finally {
      setIsLoading(false);
    }
  }

  // Funzione per visualizzare dettagli ricetta con cache
  function handleViewRecipe(id) {
    navigate(`/ricetta/${id}`);

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

            {/*Route Homepage */}
            <Routes>
              <Route path="/" element={
                <>
                <div className="random-recipes-header">
              <h3>Cerchi ispirazione?👩🏻‍🍳</h3>
            </div>

            <RandomRecipes
              appetizer={appetizer}
              maincourse={maincourse}
              dessert={dessert}
              onViewRecipe={handleViewRecipe}
            />
            
            {hasSearched && (
              <SearchResults
                results={searchResults}
                onViewRecipe={handleViewRecipe}
              />
            )}
          </>
        } />

              <Route path="/ricetta/:id" element={<RecipeDetails />} />

            </Routes>
            
      </div>
      <div className="footer">
        <p className="ft-signature">
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
          
        </div>
        <p>
          | & |
          </p>
          <p>
          supportato dal servizio API di <a href="https://spoonacular.com/food-api">Spoonacular</a>
          </p>
      </div>
    </React.Fragment>
  );
}

export default App;
