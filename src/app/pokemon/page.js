//app/pokemon/page.js
import PokemonList from "../components/PokemonList";
import config from "@/app/config.json";

export default async function PokemonPage({ searchParams }) {
      const { typesEndpoint, pokemonsEndpoint } = config.APIConfig;

      const data = await fetch(`${pokemonsEndpoint}?limit=${config.limit}`, { next: { revalidate: 60 } }).then((res) =>
            res.json(),
      );

      const pokemons = await Promise.all(
            data.results.map(async (pokemonData) => {
                  const pokemon = await fetch(pokemonData.url, { next: { revalidate: 60 } }).then((res) => res.json());
                  return {
                        name: pokemon.name,
                        id: pokemon.id,
                        pokemonUrl: pokemon.sprites.other["official-artwork"].front_default,
                        types: pokemon.types,
                  };
            }),
      );

      const typesData = await fetch(typesEndpoint)
            .then((res) => res.json())
            .then((data) => data.results.map((type) => type.name));

      const type = searchParams.type || "all";
      const limitParam = searchParams.limit || "20";
      const limit = Math.min(parseInt(limitParam), 20);
      const name = searchParams.name || "";

      const filterType = (pokemon) => {
            if (type === "all") return true;
            return pokemon.types.map((type) => type.type.name).includes(type);
      };

      const filterName = (pokemon) => {
            return pokemon.name.toLowerCase().includes(name.toLowerCase());
      };

      const filteredPokemons = pokemons.filter((pokemon) => filterName(pokemon) && filterType(pokemon)).slice(0, limit);

      return (
            <section className="pokemons_list">
                  <PokemonList pokemons={filteredPokemons} types={[...typesData, "all"]} />
            </section>
      );
}
