//app/favorites/page.js

"use client";

import { useState, useEffect, Suspense } from "react";
import PokemonList from "../components/PokemonList";
import { fetchPokemonById, fetchTypes } from "@/app/services/api";

export default function FavoritePage({ searchParams }) {
      const [favoritePokemons, setFavoritePokemons] = useState([]);
      const [typesName, setTypesName] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            const loadData = async () => {
                  const storagePokemons = JSON.parse(localStorage.getItem("favoritePokemons")) || [];

                  if (storagePokemons.length > 0) {
                        try {
                              const freshPokemons = await Promise.all(
                                    storagePokemons.map((p) => fetchPokemonById(p.id)),
                              );
                              const formattedPokemons = freshPokemons.map((pokemon) => ({
                                    name: pokemon.name,
                                    id: pokemon.id,
                                    pokemonUrl: pokemon.sprites?.other?.["official-artwork"]?.front_default,
                                    types: pokemon.types,
                              }));
                              setFavoritePokemons(formattedPokemons);
                        } catch (error) {
                              console.error("Error loading favorites", error);
                        }
                  }

                  try {
                        const types = await fetchTypes();
                        setTypesName(types);
                  } catch (error) {
                        console.error("Error loading", error);
                  }

                  setIsLoading(false);
            };

            loadData();
      }, []);

      if (isLoading) return <p>Loading favorites...</p>;

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
            <Suspense fallback={<p>Loading filters...</p>}>
                  <PokemonList pokemons={filteredPokemons} types={typesName} />
            </Suspense>
      );
}
