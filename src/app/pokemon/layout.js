//app/pokemon/layout.js

export default function PokemonLayout({ children }) {
      return (
            <div className="list">
                  <header>
                        <h1>Pokemon List</h1>
                  </header>
                  <section>{children}</section>
            </div>
      );
}
