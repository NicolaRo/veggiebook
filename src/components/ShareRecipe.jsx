import { useState } from "react";

export default function ShareRecipe({ recipe }) {
  const [showSocial, setShowSocial] = useState(false);

  if (!recipe) return null;

  const shareMessage = `Ehi non puoi perderti questa ricetta vegetariana gustosissima! Dai un'occhiata a "${recipe.title}" si prepara in ${recipe.readyInMinutes} minuti.`;

  // Link per WhatsApp
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;

  // Link per Facebook (apre la condivisione della pagina)
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

  // Link per Twitter
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(window.location.href)}`;

  return (
    <div className="share-recipe-container" style={{ position: "relative" }}>
      {/* BOTTONE PRINCIPALE */}
      <button
        className="share-button"
        onClick={() => setShowSocial(!showSocial)}
      >
        Condividi
      </button>

      {/* COLLAPSIBLE SOCIAL */}
      {showSocial && (
        <div
          className="social-buttons"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <img src="/img/whatsapp-icon.png" alt="WhatsApp" width={40} />
          </a>
          <a href={facebookLink} target="_blank" rel="noopener noreferrer">
            <img src="/img/facebook-icon.png" alt="Facebook" width={40} />
          </a>
          <a href={twitterLink} target="_blank" rel="noopener noreferrer">
            <img src="/img/twitter-icon.png" alt="Twitter" width={40} />
          </a>
        </div>
      )}
    </div>
  );
}
