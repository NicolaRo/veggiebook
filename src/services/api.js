
//Importo AXIOS (già installato a terminale) per gestire le chiamate API
import axios from "axios";

//Definisco la struttura dell'url base per la chiamata API 
const baseUrl = process.env.API_BASE_URL || "https://api.spoonacular.com";

//Rimando al file .env che contiene la vera API Key così da proteggere il dato sensibile dal commit pubblico su github
const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;


//========== 3 RICETTE RANDOM ALL'APERTURA DELL'APP ==================
//Funzione per richiedere una ricetta random per ANTIPASTO vegetariano
//È una funzione asincrona perchè si effettua una chiamata API

export async function getRandomRecipe() {

    //Compongo l'url per ottenere una ricetta + random + vegetariana + APPETIZER + number=1 per limitare i risultati a 1
    const fullUrl = `${baseUrl}/recipes/random?apiKey=${apiKey}&tags=vegetarian&type=appetizer&&maincourse&&dessert&number=1`;
    console.log("URL richiesta:", fullUrl);

    try {
        const response = await axios.get(fullUrl);
        return response.data;  // Ottengo i risultati della chiamata API con le tags impostate (APPETIZER)
      } catch (error) {
        throw error;  //Ottendo gli errori per gestire il debug
    };
}
export async function getRandomAppetizer() {

    //Compongo l'url per ottenere una ricetta + random + vegetariana + APPETIZER + number=1 per limitare i risultati a 1
    const fullUrl = `${baseUrl}/recipes/random?apiKey=${apiKey}&tags=vegetarian&type=appetizer&number=1`;
    console.log("URL richiesta:", fullUrl);

    try {
        const response = await axios.get(fullUrl);
        return response.data;  // Ottengo i risultati della chiamata API con le tags impostate (APPETIZER)
      } catch (error) {
        throw error;  //Ottendo gli errori per gestire il debug
    };
}



export async function getRandomMaincourse() {

    //Compongo l'url per ottenere una ricetta + random + vegetariana + MAIN COURSE + number=1 per limitare i risultati a 1
    const fullUrl = `${baseUrl}/recipes/random?apiKey=${apiKey}&tags=vegetarian&type=main%20course&number=1`;
    console.log("URL richiesta:", fullUrl);

    try {
        const response = await axios.get(fullUrl);
        return response.data;  // Ottengo i risultati della chiamata API con le tags impostate (MAIN COURSE)
      } catch (error) {
        throw error;  //Ottendo gli errori per gestire il debug
    };
}


export async function getRandomDessert() {

    //Compongo l'url per ottenere una ricetta + random + vegetariana + DESSERT + number=1 per limitare i risultati a 1
    const fullUrl = `${baseUrl}/recipes/random?apiKey=${apiKey}&tags=vegetarian&type=dessert&number=1`;
    console.log("URL richiesta:", fullUrl);

    try {
        const response = await axios.get(fullUrl);
        return response.data;  // Ottengo i risultati della chiamata API con le tags impostate (DESSERT)
      } catch (error) {
        throw error;  //Ottendo gli errori per gestire il debug
    };
}

// Funzione per filtrare e semplificare le ricette ottenute dall'API
// Prende in input l'array di ricette (response.data.recipes) e restituisce un array di oggetti più "puliti"
export function parseRecipes(recipesArray) {
  // map() cicla su ogni elemento dell'array originale e restituisce un nuovo array trasformato
  return recipesArray.map(recipe => ({
    // tipo di piatto (appetizer, main course, dessert)
    type: recipe.dishTypes?.[0] || 'N/A',
    // titolo della ricetta
    title: recipe.title,         

    // URL dell'immagine
    image: recipe.image,        

    // tempo totale di preparazione = preparazione + cottura
    readyInMinutes: recipe.readyInMinutes || 'N/A',
  }));
}

export async function searchRecipes(query) {  // Riceve la query come parametro
  const fullUrl = `${baseUrl}/recipes/complexSearch?apiKey=${apiKey}&query=${query}&diet=vegetarian&number=10`;
  console.log("URL ricerca:", fullUrl);
  
  try {
    const response = await axios.get(fullUrl);
    // Uso parseRecipes per pulire i dati
    return parseRecipes(response.data.results);
  } catch (error) {
    console.error("Errore nella ricerca:", error);
    throw error;
  }
}