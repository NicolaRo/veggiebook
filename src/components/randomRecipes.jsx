// Import base da React
// useState serve per gestire lo stato interno del componente
import { useState } from "react";

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
      <RecipeCard recipe={appetizer} />
      <RecipeCard recipe={maincourse} />
      <RecipeCard recipe={dessert} />
    </div>
  );
}

// 🔹 Componente per mostrare una singola ricetta
function RecipeCard({ recipe }) {
  // "recipe" è un oggetto con { title, image, readyInMinutes }
  return (
    <div className="recipe-card">
      {/* Immagine della ricetta */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-image"
      />

      {/* Titolo della ricetta */}
      <h3 className="recipe-title">{recipe.title}</h3>

      {/* Tempo di preparazione */}
      <p className="recipe-time">⏱️ {recipe.readyInMinutes} minuti</p>

      {/* Bottone per visualizzare dettagli */}
      <button className="recipe-button">Vedi ricetta</button>
    </div>
  );
}

// Esporto il componente principale
export default RandomRecipes;
