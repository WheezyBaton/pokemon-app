//app/pokemon/[id]/page.js

import PokemonDetails from "@/app/components/PokemonDetails";
import { fetchPokemonById } from "@/app/services/api";
import { notFound } from "next/navigation";

export default async function PokemonDetailsPage({ params }) {
      const { id } = await params;

      try {
            const pokemonDetails = await fetchPokemonById(id);
            return <PokemonDetails pokemonDetails={pokemonDetails} />;
      } catch (error) {
            return notFound();
      }
}
