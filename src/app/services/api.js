import config from "@/app/config.json";

const { typesEndpoint, pokemonsEndpoint } = config.APIConfig;

export async function fetchTypes() {
      const res = await fetch(typesEndpoint);
      if (!res.ok) throw new Error("Failed to fetch types");
      const data = await res.json();
      return data.results.map((type) => type.name);
}

export async function fetchPokemons(type = "all", limit = 20, name = "") {
      let basicPokemons = [];

      if (type !== "all") {
            const res = await fetch(`${typesEndpoint}/${type}`);
            if (!res.ok) throw new Error("Failed to fetch type data");
            const typeData = await res.json();
            basicPokemons = typeData.pokemon.map((p) => p.pokemon);
      } else {
            const res = await fetch(`${pokemonsEndpoint}?limit=1000`);
            if (!res.ok) throw new Error("Failed to fetch basic pokemons");
            const data = await res.json();
            basicPokemons = data.results;
      }

      if (name) {
            basicPokemons = basicPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()));
      }

      const paginatedPokemons = basicPokemons.slice(0, limit);

      const pokemons = await Promise.all(
            paginatedPokemons.map(async (pokemonData) => {
                  const res = await fetch(pokemonData.url);
                  const pokemon = await res.json();
                  return {
                        name: pokemon.name,
                        id: pokemon.id,
                        pokemonUrl:
                              pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png",
                        types: pokemon.types,
                  };
            }),
      );

      return pokemons;
}

export async function fetchPokemonById(id) {
      const res = await fetch(`${pokemonsEndpoint}/${id}`);
      if (!res.ok) throw new Error("Pokemon not found");
      return res.json();
}
