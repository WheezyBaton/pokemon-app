//app/favourites/layout.js

export default function FavoriteLayout({ children }) {
      return (
            <section className="list">
                  <h1>Favorite List Pokemon</h1>
                  <section className="pokemons_list">{children}</section>
            </section>
      );
}
