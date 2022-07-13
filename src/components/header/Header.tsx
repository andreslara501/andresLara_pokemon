import { useContext } from 'react';

import { PokemonsContext } from '../../context/ContextPokemons';
import { PokemonsContextType } from '../../interfaces/Interfaces';
import { CustomInput } from '../UI/input/CustomInput';

import './Header.css'

const Header = function () {
    const { setPage, querySearch, setQuerySearch } = useContext(PokemonsContext) as PokemonsContextType;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setQuerySearch(e.target.value);
        setPage(1);
    }

    return (
        <header className="App-header">
            <div>
                <h1>Listado de Pokemón</h1>
                <div>
                    <CustomInput
                        type='text'
                        name='Search'
                        onChange={handleChange}
                        value={querySearch}
                        placeholder="Buscar pokemones"
                    />
                </div>
            </div>
        </header>
    )
}

export { Header }
