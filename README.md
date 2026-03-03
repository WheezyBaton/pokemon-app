# 🌟 Pokémon App

A web application that allows you to browse, search, filter, and compare Pokémon. The project relies on the powerful external API ([PokéAPI](https://pokeapi.co/)) and is built using the latest standards of the **Next.js 14** framework (App Router, Server & Client Components).

## 🚀 Main Features

* **Pokedex Browsing:** Browse the Pokémon list with adjustable pagination limits.
* **Advanced Filtering & Searching:** Search for Pokémon by name and filter them by specific types (e.g., fire, water).
* **Shareable URLs:** Active filters and search parameters are automatically synchronized with the browser's address bar, making it easy to share specific search results with others.
* **Pokémon Details:** A dedicated page for each creature displaying its official artwork, weight, height, types, and base statistics.
* **Favorites:** Save your preferred Pokémon to a custom favorites list. The list is persistently stored in the browser (`localStorage`) and automatically fetches the freshest data from the API upon revisiting the page.
* **Compare Tool:** A dedicated tool that allows you to select and place two Pokémon side-by-side to easily compare their stats.

## 🛠️ Technologies Used

* **Framework:** [Next.js 14](https://nextjs.org/)
* **UI Library:** [React 18](https://react.dev/)
* **Styling:** Custom CSS
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
* **Data Source:** [REST PokéAPI](https://pokeapi.co/)

## 📐 Architecture & Design Patterns

The project was developed with a strong focus on Clean Code and optimization. It implements the following patterns:
1. **Container - Presenter (Smart & Dumb Components):** View components (like `<Compare />` or `<PokemonDetails />`) are strictly "dumb" – they are solely responsible for rendering the UI based on the `props` they receive.
2. **Service Layer:** All external API communication logic is abstracted and isolated into a dedicated service file (`app/services/api.js`).
3. **Server Components:** Pages responsible for data fetching (e.g., the main list, details page) utilize default Server-Side Rendering (SSR). This provides excellent performance, great SEO, and eliminates UI loading flashes.
4. **Hydration & LocalStorage Handling:** Interactive lists (Favorites, Compare) safely interact with the browser's storage, strictly following React lifecycle principles to completely prevent "Hydration Mismatch" errors.

## 📋 System Requirements

To run this project locally, you will need:
* **Node.js**: version 18.17 or newer.
* A package manager: **npm** (comes with Node.js), **yarn**, or **pnpm**.

## 💻 Getting Started (Step-by-Step)

1. **Clone the repository**
```
git clone [https://github.com/WheezyBaton/pokemon-app.git](https://github.com/WheezyBaton/pokemon-app.git)
cd pokemon-app
```

2. **Install dependencies**
```
npm install
# or
yarn install
```

3. **Run the development server**
```
npm run dev
# or
yarn dev
```

4. **Open the application**
Navigate to [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your web browser.

## 📁 Project Structure

The main application code is located inside the `src/app/` directory:

* `components/` - Reusable UI components.
* `services/` - The API connection layer (files handling HTTP requests).
* `pokemon/`, `favorites/`, `compareLists/` - Distinct views/pages utilizing the Next.js App Router.
* `style/` - Global CSS stylesheets.
