const baseURL = "https://pokeapi.co/api/v2/pokemon";
// 1. Figure out how to make a single request to the [Pokemon API](https://pokeapi.co/) to get names and URLs for every pokemon in the database.
async function getAllPokemon() {
  let pokemons = await axios.get(`${baseURL}?limit=10000&offset=0`);
  console.log(pokemons.data.results);
}
getAllPokemon();

// 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, ***console.log*** the data for each pokemon.

// helper method to pick random numbers from 0-1301. Allow user to request more than three random pokemon later.
function randomIdxs(arrLength) {
  let arr = [];
  for (i = 0; i < arrLength; i++) {
    let randomIdx = Math.floor(Math.random() * 1301);
    if (!arr.includes(randomIdx)) {
      // Ensure unique random indices
      arr.push(randomIdx);
    }
  }
  return arr;
}

async function getPokemons(numOfPokemons) {
  let indexes = randomIdxs(numOfPokemons);
  let allPokemonData = await axios.get(`${baseURL}?limit=10000&offset=0`);
  let pokemonUrls = indexes.map((idx) => allPokemonData.data.results[idx].url);
  let pokemonsData = await Promise.all(
    pokemonUrls.map((url) => axios.get(url))
  );
  pokemonsData.forEach((pokemon) => console.log(pokemon.data));
}
getPokemons(3);

// 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s ***species*** URL (you should see a key of ***species*** in the data). Once *that* request comes back, look in the ***flavor_text_entries*** key of the response data for a description of the species written in English. If you find one, ***console.log*** the name of the pokemon along with the description you found.

//     Example: “ducklett: They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater.”
async function getSpecies(speciesUrl, name) {
  let response = await axios.get(speciesUrl);
  let flavorTextEntries = response.data.flavor_text_entries;
  let eng = flavorTextEntries.find((entry) => entry.language.name === "en");
  if (eng) {
    console.log(`${name}: ${eng.flavor_text}`);
  } else {
    console.log(`${name}: No description found.`);
  }
}

async function getPokeInfo(numOfPokemons) {
  let indexes = randomIdxs(numOfPokemons);
  let allPokemonData = await axios.get(`${baseURL}?limit=10000&offset=0`);
  let pokemonUrls = indexes.map((idx) => allPokemonData.data.results[idx].url);
  let pokemonsData = await Promise.all(
    pokemonUrls.map((url) => axios.get(url))
  );
  pokemonsData.forEach(async (pokemon) => {await getSpecies(pokemon.data.species.url, pokemon.data.name)});
}
getPokeInfo(3);
