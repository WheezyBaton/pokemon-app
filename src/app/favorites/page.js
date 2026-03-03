//app/favorites/page.js

"use client";

import { useState, useEffect, Suspense } from "react";
import PokemonList from "../components/PokemonList";

export default function FavoritePage({ searchParams }) {
      const [favoritePokemons, setFavoritePokemons] = useState([]);
      const [typesName, setTypesName] = useState([]);
      const [isMounted, setIsMounted] = useState(false);

      useEffect(() => {
            const storagePokemons = localStorage.getItem("favoritePokemons");
            if (storagePokemons) setFavoritePokemons(JSON.parse(storagePokemons));

            const storedTypes = localStorage.getItem("types");
            if (storedTypes) setTypesName(JSON.parse(storedTypes));

            setIsMounted(true);
      }, []);

      if (!isMounted) {
            return <p>Loading favorites...</p>;
      }

      const type = searchParams.type || "all";
      const limitParam = searchParams.limit || "20";
      const limit = Math.min(parseInt(limitParam), 20);
      const name = searchParams.name || "";
      const sortCriterion = searchParams.sort || "";

      const sortedFavoritePokemons = favoritePokemons.sort((p1, p2) => {
            if (sortCriterion === "name") return p1.name.localeCompare(p2.name);
            return 0;
      });

      const filterType = (pokemon) => {
            if (type === "all") return true;
            return pokemon.types.map((type) => type.type.name).includes(type);
      };

      const filterName = (pokemon) => {
            return pokemon.name.toLowerCase().includes(name.toLowerCase());
      };

      const filteredPokemons = sortedFavoritePokemons
            .filter((pokemon) => filterName(pokemon) && filterType(pokemon))
            .slice(0, limit);

      return (
            <Suspense fallback={<p>Wczytywanie filtrów...</p>}>
                  <PokemonList pokemons={filteredPokemons} types={typesName} />
            </Suspense>
      );
}
