"use client"

import { useState } from "react"
import PokemonList from "../components/PokemonList"

export default function FavortiePage({ searchParams }) {
  const [favoritePokemons] = useState(() => {
    const storagePokemons = localStorage.getItem('favoritePokemons')
    return storagePokemons ? JSON.parse(storagePokemons) : []
  })
  
  const [typesName] = useState(() => {
    const storedTypes = localStorage.getItem('types')
    return storedTypes ? JSON.parse(storedTypes) : []
  })

  const type = searchParams.type || 'all'
  const limitParam = searchParams.limit || '20'
  const limit = Math.min(parseInt(limitParam), 20)
  const name = searchParams.name || ''
  const sortCriterion = searchParams.sort || ''

  const sortedFavoritePokemons = favoritePokemons.sort((p1, p2) => {
    if (sortCriterion === 'name') return p1.name.localeCompare(p2.name)
    return 0
  })

  const filterType = pokemon => {
    if (type === 'all') return true
    return pokemon.types.map(type => type.type.name).includes(type)
  }

  const filterName = pokemon => {
    return pokemon.name.toLowerCase().includes(name.toLowerCase())
  }

  const filteredPokemons = sortedFavoritePokemons
    .filter(pokemon => filterName(pokemon) && filterType(pokemon))
    .slice(0, limit)

  return (
    <PokemonList pokemons={filteredPokemons} types={typesName} />
  )
}