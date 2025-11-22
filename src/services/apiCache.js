// apiCache.js
// ==================================================================
// OBBIETTIVO EFFICIENZA: Cache in memoria per risparmiare chiamate API
// ==================================================================
// Come funziona:
// 1. Quando fà una chiamata API, il risultato viene salvato in un oggetto
// 2. Se richiamo la stessa funzione, viene restituito il dato salvato
// 3. Quando CHIUDO il browser, la cache viene cancellata
// 4. Per svuotare manualmente: apri console e scrivi > sessionStorage.clear()

// Oggetto che conterrà tutti i dati cachati
const cache = {
  randomAppetizer: null,
  randomMaincourse: null,
  randomDessert: null,
  searches: {},        // Per le ricerche: {query: risultati}
  recipeDetails: {}    // Per i dettagli: {id: dettagli}
};

// IMPORTANTE: Questo è il tempo di vita della cache (in millisecondi)
// 3600000 ms = 1 ora. Dopo questo tempo, i dati vengono richiesti di nuovo
const CACHE_DURATION = 3600000; // 1 ora

// Funzione helper per verificare se un dato in cache è ancora valido
function isCacheValid(cacheEntry) {
  if (!cacheEntry) return false;
  const now = Date.now();
  return (now - cacheEntry.timestamp) < CACHE_DURATION;
}

// Funzione wrapper per cachare le ricette random
export async function getCachedRandomRecipe(apiFunction, cacheKey) {
  // Se il dato esiste in cache ed è ancora valido, restituiscilo
  if (cache[cacheKey] && isCacheValid(cache[cacheKey])) {
    console.log(`✅ CACHE HIT: ${cacheKey} (risparmio chiamata API)`);
    return cache[cacheKey].data;
  }
  
  // Altrimenti fai la chiamata API
  console.log(`🌐 API CALL: ${cacheKey} (recupero dati freschi)`);
  const data = await apiFunction();
  
  // Salva il risultato in cache con timestamp
  cache[cacheKey] = {
    data: data,
    timestamp: Date.now()
  };
  
  return data;
}

// Funzione wrapper per cachare le ricerche
export async function getCachedSearch(apiFunction, query) {
  const cacheKey = `search_${query}`;
  
  if (cache.searches[cacheKey] && isCacheValid(cache.searches[cacheKey])) {
    console.log(`✅ CACHE HIT: ricerca "${query}"`);
    return cache.searches[cacheKey].data;
  }
  
  console.log(`🌐 API CALL: ricerca "${query}"`);
  const data = await apiFunction(query);
  
  cache.searches[cacheKey] = {
    data: data,
    timestamp: Date.now()
  };
  
  return data;
}

// Funzione wrapper per cachare i dettagli delle ricette
export async function getCachedRecipeDetails(apiFunction, id) {
  const cacheKey = `details_${id}`;
  
  if (cache.recipeDetails[cacheKey] && isCacheValid(cache.recipeDetails[cacheKey])) {
    console.log(`✅ CACHE HIT: dettagli ricetta ID ${id}`);
    return cache.recipeDetails[cacheKey].data;
  }
  
  console.log(`🌐 API CALL: dettagli ricetta ID ${id}`);
  const data = await apiFunction(id);
  
  cache.recipeDetails[cacheKey] = {
    data: data,
    timestamp: Date.now()
  };
  
  return data;
}

// Funzione per svuotare manualmente la cache (utile per debugging)
export function clearCache() {
  cache.randomAppetizer = null;
  cache.randomMaincourse = null;
  cache.randomDessert = null;
  cache.searches = {};
  cache.recipeDetails = {};
  console.log('🗑️ Cache svuotata');
}

// Funzione per vedere cosa c'è in cache (utile per debugging)
export function inspectCache() {
  console.log('📦 Contenuto cache:', cache);
}