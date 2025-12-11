//Strumento di condivisione della ricetta
import { useState } from "react";

//Funzione per esportare i dettagli della ricetta:
export default function ShareRecipe({ recipe }) {
  const [showSocial, setShowSocial] = useState(false);

  if (!recipe) return null;

  //Salvo un messaggio da includere nella condivisione della ricetta, il titolo e l'ID
  const recipeUrl = `${window.location.origin}/ricetta/${recipe.id}`;
  const shareMessage = `Ehi non puoi perderti questa ricetta vegetariana gustosissima! Dai un'occhiata a "${recipe.title}" si prepara in ${recipe.readyInMinuti} minuti. Aprila subito: ${recipeUrl}`;

  // Link per WhatsApp
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;

  // Link per Facebook (apre la condivisione della pagina)
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

  // Link per Twitter
  const XLink = `https://x.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(window.location.href)}`;

  return (
    <>
      {/* BOTTONE PRINCIPALE */}
      <button
        className={`"sharing-button" ${showSocial ? "active" : ""}`}
        onClick={() => setShowSocial(!showSocial)}
    >
        <img className="share-icon" src="/img/share-icon.png" alt="Icona condividi" />
      </button>

      {/* COLLAPSIBLE SOCIAL */}
      {showSocial && (
        <div
          className="share-social-buttons"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <img className="share-icon" src="/img/whatsapp-icon.png" alt="Icona WhatsApp" />
          </a>
          <a href={facebookLink} target="_blank" rel="noopener noreferrer">
            <img className="share-icon" src="/img/facebook-icon.png" alt="Facebook" />
          </a>
          <a href={XLink} target="_blank" rel="noopener noreferrer">
            <img className="share-icon" src="/img/X-icon.png" alt="Icona X" />
          </a>
        </div>
      )}
    </>
  );
}