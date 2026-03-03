//app/pokemon/page.js

import PokemonList from "../components/PokemonList";
import { fetchPokemons, fetchTypes } from "@/app/services/api";
import { Suspense } from "react";

export default async function PokemonPage({ searchParams }) {
      const type = searchParams.type || "all";
      const limitParam = searchParams.limit || "20";
      const limit = Math.min(parseInt(limitParam), 50);
      const name = searchParams.name || "";

      const pokemons = await fetchPokemons(type, limit, name);
      const typesData = await fetchTypes();

      return (
            <section className="pokemons_list">
                  <Suspense fallback={<p>Loading Pokémon list...</p>}>
                        <PokemonList pokemons={pokemons} types={["all", ...typesData]} />
                  </Suspense>
            </section>
      );
}
