import { useContext } from 'react';

import { PokemonsContextType, IPokemon } from '../../interfaces/Interfaces';
import { PokemonsContext } from '../../context/ContextPokemons';
import { PokemonItem } from '../pokemonItem/PokemonItem';


import './PokemonList.css'

function PokemonList () {
    const { pokemons } = useContext(PokemonsContext) as PokemonsContextType;

    return (
        <div id="pokemons-list">
            { !!pokemons.length &&
                <ul>
                    {pokemons.map((pokemon:IPokemon) => (
                        <PokemonItem pokemon={pokemon} key={pokemon.name} />
                    ))}
                </ul>
            }
            { !pokemons.length && <div>:( No se encontraron pokemóns</div> }
        </div>
    )
}

export { PokemonList }
