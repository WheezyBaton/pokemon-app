export default function CompareLayout({children}) {
  return (
    <section className="compare-list">
      <h1>Compare Pokémon</h1>
      <section className="compare_pokemons_list">
        {children}
      </section>
    </section>
  )
}