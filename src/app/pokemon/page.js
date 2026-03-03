//app/pokemon/page.js

import PokemonList from "../components/PokemonList";
import config from "@/app/config.json";
import { Suspense } from "react";

export default async function PokemonPage({ searchParams }) {
      const { typesEndpoint, pokemonsEndpoint } = config.APIConfig;

      const type = searchParams.type || "all";
      const limitParam = searchParams.limit || "20";
      const limit = Math.min(parseInt(limitParam), 50);
      const name = searchParams.name || "";

      let basicPokemons = [];

      if (type !== "all") {
            const typeData = await fetch(`${typesEndpoint}/${type}`).then((res) => res.json());
            basicPokemons = typeData.pokemon.map((p) => p.pokemon);
      } else {
            const data = await fetch(`${pokemonsEndpoint}?limit=1000`).then((res) => res.json());
            basicPokemons = data.results;
      }

      if (name) {
            basicPokemons = basicPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()));
      }

      const paginatedPokemons = basicPokemons.slice(0, limit);

      const pokemons = await Promise.all(
            paginatedPokemons.map(async (pokemonData) => {
                  const pokemon = await fetch(pokemonData.url).then((res) => res.json());
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

      return (
            <section className="pokemons_list">
                  <Suspense fallback={<p>Wczytywanie listy Pokémonów...</p>}>
                        <PokemonList pokemons={pokemons} types={["all", ...typesData]} />
                  </Suspense>
            </section>
      );
}
