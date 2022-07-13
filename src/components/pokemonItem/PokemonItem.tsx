import { useContext } from 'react';

import { PokemonsContext } from '../../context/ContextPokemons';
import { IPokemon, PokemonsContextType } from '../../interfaces/Interfaces';

import { ImagePokemon } from '../UI/imagePokemon/ImagePokemon';
import './PokemonItem.css'

const PokemonItem = function ({ pokemon }: { pokemon: IPokemon }) {
    const { pokemonSelected, setPokemonSelected } = useContext(PokemonsContext) as PokemonsContextType;

    function uppercase (string: string): string {
        return string.length ? `${string[0].toUpperCase()}${string.substring(1)}` : '';
    }

    function selectPokemon(pokemon:IPokemon): void {
        setPokemonSelected(pokemon);
    }

    function isSelected(): boolean {
        return pokemonSelected.name === pokemon.name ? true : false;
    }

    return (
        <li
            onClick={() => selectPokemon(pokemon)}
            className={`pokemon-item ${isSelected() ? 'selected' : ''}`}
        >
            <ImagePokemon pokemon={pokemon}/>
            <h2>{uppercase(pokemon.name)}</h2>
            <h3>Número {pokemon.id}</h3>
        </li>
    )
}

export { PokemonItem }
