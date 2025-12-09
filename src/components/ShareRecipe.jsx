import React from "react";

// Icone social (puoi sostituire con le tue o usare librerie tipo react-icons)
const socialLinks = {
  facebook: (url, text) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
  twitter: (url, text) =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  whatsapp: (url, text) =>
    `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`,
};

function ShareRecipe({ recipe }) {
  if (!recipe) return null;

  const { id, title, totalMinutes } = recipe;

  // Componi link condivisibile
  const recipeUrl = `${window.location.origin}/recipe/${id}`;
  const shareText = `Ehi, non puoi perderti questa ricetta gustosissima! "${title}" si prepara in ${totalMinutes} minuti.`;

  return (
    <div className="share-recipe-container">
      <p className="share-text">{shareText}</p>
      <div className="share-buttons">
        <a
          href={socialLinks.facebook(recipeUrl, shareText)}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn facebook"
        >
          Facebook
        </a>
        <a
          href={socialLinks.twitter(recipeUrl, shareText)}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn twitter"
        >
          Twitter
        </a>
        <a
          href={socialLinks.whatsapp(recipeUrl, shareText)}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn whatsapp"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export default ShareRecipe;
