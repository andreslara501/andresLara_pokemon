import PokemonsProvider from './context/ContextPokemons';

import { Header } from './components/header/Header';
import { NavBar } from './components/UI/navBar/NavBar';
import { PokemonList } from './components/pokemonList/PokemonList';
import { Description } from './components/description/Description';

import './App.css';

function App() {
  return (
    <div className="App">
      <PokemonsProvider>
        <Header/>
        <div id="content">
          <section>
            <article>
              <NavBar/>
              <PokemonList/>
              <NavBar/>
            </article>
            <Description/>
          </section>
        </div>
      </PokemonsProvider>
    </div>
  );
}

export default App;
