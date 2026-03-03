//app/compareLists/page.js

"use client";

import { useEffect, useState } from "react";
import Compare from "@/app/components/Compare";
import { fetchPokemonById } from "@/app/services/api";

export default function ComparePage() {
      const [comparedPokemons, setComparedPokemons] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            const loadComparedPokemons = async () => {
                  const storedPokemons = JSON.parse(localStorage.getItem("comparePokemons")) || [];
                  if (storedPokemons.length > 0) {
                        try {
                              const detailedPokemons = await Promise.all(
                                    storedPokemons.map((pokemon) => fetchPokemonById(pokemon.id)),
                              );
                              setComparedPokemons(detailedPokemons);
                        } catch (error) {
                              console.error("Error while retrieving data for comparison", error);
                        }
                  }
                  setIsLoading(false);
            };

            loadComparedPokemons();
      }, []);

      function handleResetComparison() {
            localStorage.removeItem("comparePokemons");
            setComparedPokemons([]);
      }

      function handleRemove(id) {
            const updatedPokemons = comparedPokemons.filter((pokemon) => pokemon.id !== id);
            setComparedPokemons(updatedPokemons);

            const storedPokemons = JSON.parse(localStorage.getItem("comparePokemons")) || [];
            const newStoredPokemons = storedPokemons.filter((pokemon) => pokemon.id !== id);
            localStorage.setItem("comparePokemons", JSON.stringify(newStoredPokemons));
      }

      if (isLoading) return <p>Loading comparison...</p>;

      return (
            <section className="compare_page">
                  <Compare
                        comparedPokemons={comparedPokemons}
                        onReset={handleResetComparison}
                        onRemove={handleRemove}
                  />
            </section>
      );
}
