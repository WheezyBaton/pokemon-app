export default function FavortieLayout({children}){
    return (
      <section className="list">
        <h1>Favorite List Pokemon</h1>
        <section className="pokemons_list">
          {children}
        </section>
      </section>
    )
  }