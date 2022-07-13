import { useContext } from 'react';

import { PokemonsContext } from '../../../context/ContextPokemons';
import { PokemonsContextType } from '../../../interfaces/Interfaces';

import './NavBar.css';

const NavBar = () => {
    const { nextPokemons, backPokemons, page } = useContext(PokemonsContext) as PokemonsContextType;
    const pokemonsCounter = parseInt(localStorage.getItem('REACT_POKEMONS_COUNTER') || '1');
    const pokemonsByPage = parseInt(process.env.REACT_APP_POKEMONS_BY_PAGINATION || '1');
    const pages = Math.ceil( pokemonsCounter / pokemonsByPage );
    const progressPage = (page * 100) / pages;

    return (
        <nav style={{display: !!pages ? 'grid' : 'none'}}>
            <button type="button" disabled={ page === 1 ? true : false } onClick={ backPokemons } >
                ❮ <span>Atrás</span>
            </button>
            <div id="page">
                <div>
                    <span>Página </span> 
                    { page } / { pages }
                </div>
                <div id="progress">
                    <div id="bar" style={{width: `${progressPage}%`}} />
                </div>
            </div>
            <button
                type="button"
                disabled={ page === pages }
                onClick={ nextPokemons }
            >
                <span>Siguiente</span> ❯
            </button>
        </nav>
    )
}

export { NavBar }