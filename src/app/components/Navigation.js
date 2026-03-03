//app/components/Navigation.js
import Link from "next/link";
import "@/app/style/main.css";

export default function Navigation() {
      return (
            <nav className="navigation">
                  <ul>
                        <li>
                              <Link className="logo" href="/">
                                    <img className="logo" src="https://www.svgrepo.com/show/306584/pokemon.svg"></img>
                              </Link>
                        </li>
                        <li>
                              <Link href="/pokemon">Pokemon List</Link>
                        </li>
                        <li>
                              <Link href="/favorites">Favorites</Link>
                        </li>
                        <li>
                              <Link href="/compareLists">Compare</Link>
                        </li>
                  </ul>
            </nav>
      );
}
