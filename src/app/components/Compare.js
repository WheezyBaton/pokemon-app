//app/components/Compare.js

"use client";

import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import PokemonDetails from "./PokemonDetails";

export default function Compare() {
      const [comparedPokemons, setComparedPokemons] = useState([]);

      useEffect(() => {
            const storedPokemons = JSON.parse(localStorage.getItem("comparePokemons")) || [];

            const fetchPokemonDetails = async () => {
                  const detailedPokemons = await Promise.all(
                        storedPokemons.map((pokemon) =>
                              fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).then((res) => res.json()),
                        ),
                  );
                  setComparedPokemons(detailedPokemons);
            };

            if (storedPokemons.length > 0) {
                  fetchPokemonDetails();
            }
      }, []);

      function handleResetComparison() {
            localStorage.removeItem("comparePokemons");
            setComparedPokemons([]);
      }

      function handleRemoveFromLocalCompareStorage(id) {
            const updatedPokemons = comparedPokemons.filter((pokemon) => pokemon.id !== id);
            setComparedPokemons(updatedPokemons);

            const storedPokemons = JSON.parse(localStorage.getItem("comparePokemons")) || [];
            const newStoredPokemons = storedPokemons.filter((pokemon) => pokemon.id !== id);
            localStorage.setItem("comparePokemons", JSON.stringify(newStoredPokemons));
      }

      return (
            <section className="compare-list">
                  <h1>Compare Pokémon</h1>
                  <ul className="pokemon_list">
                        {comparedPokemons.length === 0 ? (
                              <p>No Pokémon to compare.</p>
                        ) : (
                              comparedPokemons.map((pokemon) => (
                                    <li className="pokemon" key={pokemon.id}>
                                          <PokemonDetails pokemonDetails={pokemon} />
                                          <IoIosCloseCircle
                                                onClick={() => handleRemoveFromLocalCompareStorage(pokemon.id)}
                                                className="io_ios_circle"
                                          />
                                    </li>
                              ))
                        )}
                  </ul>
                  <button className="reset" onClick={handleResetComparison}>
                        Reset Comparison
                  </button>
            </section>
      );
}
