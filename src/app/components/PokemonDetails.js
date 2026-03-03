//app/components/PokemonDetails.js

export default function PokemonDetails({ pokemonDetails }) {
      const { name, weight, height } = pokemonDetails;

      const imgUrl =
            pokemonDetails.sprites?.other?.["official-artwork"]?.front_default ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png";

      return (
            <div className="pokemon-details">
                  <h1>Pokemon Details {name}</h1>
                  <div className="details_wrap">
                        <img src={imgUrl} alt={`Pokemon ${name}`} width={200} height={200} />
                        <div className="details_content">
                              <h3>Elementary information:</h3>
                              <p>
                                    Weight: <strong>{weight}</strong>
                              </p>
                              <p>
                                    Height: <strong>{height}</strong>
                              </p>

                              <h3>Elementary Statistics:</h3>
                              {pokemonDetails.stats.map((stat, i) => (
                                    <p key={i}>
                                          {stat.stat.name}: <b>{stat.base_stat}</b>
                                    </p>
                              ))}
                              <p>
                                    Typy: <b>{pokemonDetails.types.map((type) => type.type.name).join(", ")}</b>
                              </p>
                        </div>
                  </div>
            </div>
      );
}
