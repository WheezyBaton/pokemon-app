//app/components/Compare.js

"use client";

import { IoIosCloseCircle } from "react-icons/io";
import PokemonDetails from "./PokemonDetails";

export default function Compare({ comparedPokemons, onReset, onRemove }) {
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
                                                onClick={() => onRemove(pokemon.id)}
                                                className="io_ios_circle"
                                          />
                                    </li>
                              ))
                        )}
                  </ul>
                  <button className="reset" onClick={onReset}>
                        Reset Comparison
                  </button>
            </section>
      );
}
