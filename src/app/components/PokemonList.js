//app/components/PokemonList.js

"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import { useState, useEffect } from "react";

export default function PokemonList({ pokemons, types, isComparing = false }) {
      const [pokemonsId, setPokemonsId] = useState([]);
      const [comparedPokemonsId, setComparedPokemonsId] = useState([]);
      const [isMounted, setIsMounted] = useState(false);

      const router = useRouter();
      const routePathname = usePathname();
      const searchParams = useSearchParams();

      const currentName = searchParams.get("name") || "";
      const currentType = searchParams.get("type") || "all";
      const currentLimit = searchParams.get("limit") || 20;

      const [searchValue, setSearchValue] = useState(currentName);
      const [limitValue, setLimitValue] = useState(currentLimit);

      useEffect(() => {
            const favPokemons = JSON.parse(localStorage.getItem("favoritePokemons")) || [];
            const compPokemons = JSON.parse(localStorage.getItem("comparePokemons")) || [];

            setPokemonsId(favPokemons.map((pokemon) => pokemon.id));
            setComparedPokemonsId(compPokemons.map((pokemon) => pokemon.id));

            if (types && types.length > 0) {
                  localStorage.setItem("types", JSON.stringify(types));
            }
            setIsMounted(true);
      }, [types]);

      function handleAddSearchParam(type, param) {
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.set(type, param);
            currentParams.set("limit", limitValue);
            router.push(`${routePathname}?${currentParams.toString()}`);
      }

      function handleSelectChange(event) {
            const val = event.target.value;
            handleAddSearchParam("type", val);
      }

      function handleAddToLocalStorage(id) {
            const favoritePokemons = JSON.parse(localStorage.getItem("favoritePokemons")) || [];
            const newFav = pokemons.filter((pokemon) => pokemon.id === id).concat(favoritePokemons);
            localStorage.setItem("favoritePokemons", JSON.stringify(newFav));
            setPokemonsId(newFav.map((pokemon) => pokemon.id));
      }

      function handleRemoveFromLocalStorage(id) {
            const favPokemons = JSON.parse(localStorage.getItem("favoritePokemons"));
            const newFav = favPokemons.filter((pokemon) => pokemon.id !== id);
            localStorage.setItem("favoritePokemons", JSON.stringify(newFav));
            setPokemonsId(newFav.map((pokemon) => pokemon.id));
      }

      function handleAddToLocalCompareStorage(id) {
            const comparePokemons = JSON.parse(localStorage.getItem("comparePokemons")) || [];

            const alreadyInComparison = comparePokemons.some((pokemon) => pokemon.id === id);
            if (alreadyInComparison) {
                  console.log("This Pokémon is already in the comparison.");
                  return;
            }

            if (comparePokemons.length >= 2) {
                  console.log("You can only compare up to 2 Pokémon.");
                  return;
            }

            const newCom = pokemons.filter((pokemon) => pokemon.id === id).concat(comparePokemons);
            localStorage.setItem("comparePokemons", JSON.stringify(newCom));
            setComparedPokemonsId(newCom.map((pokemon) => pokemon.id));
      }

      function handleRemoveFromLocalCompareStorage(id) {
            const comPokemons = JSON.parse(localStorage.getItem("comparePokemons")) || [];
            const newCom = comPokemons.filter((pokemon) => pokemon.id !== id);
            localStorage.setItem("comparePokemons", JSON.stringify(newCom));
            setComparedPokemonsId(newCom.map((pokemon) => pokemon.id));
      }

      return (
            <>
                  <section className="form">
                        <div>
                              <span>Pokemon name:</span>
                              <input
                                    type="text"
                                    id="search_input"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                              />
                              <button id="search_btn" onClick={() => handleAddSearchParam("name", searchValue)}>
                                    Search
                              </button>
                        </div>
                        <div>
                              <label>
                                    <span>Pokemon type:</span>
                                    <select className="type" onChange={handleSelectChange} defaultValue={currentType}>
                                          {types.map((type) => (
                                                <option key={type} value={type}>
                                                      {type}
                                                </option>
                                          ))}
                                    </select>
                              </label>
                        </div>
                        <div className="limit">
                              <label>
                                    <span>Pokemon limit:</span>
                                    <input
                                          value={limitValue}
                                          onChange={(e) => setLimitValue(e.target.value)}
                                          placeholder="Limit"
                                          id="limit"
                                          type="number"
                                          min={1}
                                          max={50}
                                    />
                              </label>
                        </div>
                  </section>
                  <ul className="pokemon-list">
                        {pokemons.map((pokemon) => {
                              const isCompareLimitReached = comparedPokemonsId.length >= 2;
                              return (
                                    <li className="pokemon" key={pokemon.id}>
                                          <p>{pokemon.name}</p>
                                          <Link href={`/pokemon/${pokemon.id}`}>
                                                <img
                                                      src={pokemon.pokemonUrl}
                                                      alt={`${pokemon.name} image`}
                                                      width={100}
                                                      height={100}
                                                />
                                          </Link>

                                          {isMounted && (
                                                <>
                                                      {pokemonsId.includes(pokemon.id) ? (
                                                            <FaStar
                                                                  onClick={() =>
                                                                        handleRemoveFromLocalStorage(pokemon.id)
                                                                  }
                                                                  className="fav_star_rem"
                                                            />
                                                      ) : (
                                                            <FaRegStar
                                                                  onClick={() => handleAddToLocalStorage(pokemon.id)}
                                                                  className="fav_star_add"
                                                            />
                                                      )}

                                                      {!isComparing && !isCompareLimitReached && (
                                                            <IoIosAddCircle
                                                                  onClick={() =>
                                                                        handleAddToLocalCompareStorage(pokemon.id)
                                                                  }
                                                                  className="io_ios_circle"
                                                            />
                                                      )}
                                                      {isComparing && (
                                                            <IoIosCloseCircle
                                                                  onClick={() =>
                                                                        handleRemoveFromLocalCompareStorage(pokemon.id)
                                                                  }
                                                                  className="io_ios_circle"
                                                            />
                                                      )}
                                                </>
                                          )}
                                    </li>
                              );
                        })}
                  </ul>
            </>
      );
}
