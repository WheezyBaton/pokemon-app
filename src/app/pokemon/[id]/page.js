//app/pokemon/[id]/page.js

import PokemonDetails from "@/app/components/PokemonDetails";
import { notFound } from "next/navigation";

export default async function PokemonDetailsPage({ params }) {
      const { id } = await params;

      try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

            if (!res.ok) {
                  return notFound();
            }

            const pokemonDetails = await res.json();
            return <PokemonDetails pokemonDetails={pokemonDetails} />;
      } catch (error) {
            return notFound();
      }
}
