import { render, screen } from '@testing-library/react';

import { PokemonList } from './PokemonList';
import { PokemonsContext } from '../../context/ContextPokemons';
import { PokemonsContextType } from '../../interfaces/Interfaces';
import { contextMock } from '../../mocks/PokemonContext.mock';

const contextMockObject:PokemonsContextType = new contextMock();

function renderComponentContext(contextMockObject:PokemonsContextType) {
  return render(
    <PokemonsContext.Provider value={ contextMockObject }>
      <PokemonList />
    </PokemonsContext.Provider>
  );
}

test('Show 2 pokemons', () => {
  renderComponentContext(contextMockObject);
  expect(screen.getByText(/Charmeleon/i)).toBeInTheDocument();
  expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
});

test('Show "empty" pokemons', () => {
  contextMockObject.pokemons = [];
  renderComponentContext(contextMockObject);
  expect(screen.getByText(":( No se encontraron pokemóns")).toBeInTheDocument();
});