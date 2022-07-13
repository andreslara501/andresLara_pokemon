import { useState, useEffect, createContext } from 'react';

import { PokemonsContextType, IPokemon } from '../interfaces/Interfaces';
import { pokemonMock } from '../mocks/Pokemon.mock';
import { getAllPokemons } from '../services/PokeapiService';

export const PokemonsContext = createContext<PokemonsContextType | null>(null);

const PokemonsProvider = function ({ children } : { children:any }) {
  const pokemonDefault:IPokemon = pokemonMock;

  const [page, setPage] = useState<number>(1);
  const [querySearch, setQuerySearch] = useState<string>('');
  const [pokemons, setPokemons] = useState<IPokemon[]>([pokemonDefault]);
  const [pokemonSelected, setPokemonSelected] = useState<IPokemon>(pokemonDefault);

  useEffect(() => {
    getPokemons(page, querySearch);
  }, [page, querySearch]);

  const getPokemons = async (page: number, querySearch: string): Promise<void> => {
    const poketmp:IPokemon[] = await getAllPokemons(page, querySearch)
    setPokemons(poketmp);
  };

  const backPokemons = () => setPage(page - 1);
  const nextPokemons = () => setPage(page + 1);
  const closePokemon = () => setPokemonSelected(pokemonDefault);

  return <PokemonsContext.Provider value={
    {
      pokemons,
      pokemonSelected,
      setPokemonSelected,
      page,
      setPage,
      backPokemons,
      nextPokemons,
      closePokemon,
      querySearch,
      setQuerySearch,
    }
  }>
    <div style={{"paddingRight": pokemonSelected.name.length ? '300px' : '0px'}}>
      {children}
    </div>
  </PokemonsContext.Provider>;
};

export default PokemonsProvider;