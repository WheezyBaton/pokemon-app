//app/pokemon/[id]/page.js
import PokemonDetails from "@/app/components/PokemonDetails";

export default async function PokemonDetailsPage({ params }) {
      const { id } = await params;

      const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json());

      return <PokemonDetails pokemonDetails={pokemonDetails} />;
}
