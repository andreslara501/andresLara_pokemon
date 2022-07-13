import { render, screen, fireEvent } from '@testing-library/react';

import { PokemonItem } from './PokemonItem';
import { PokemonsContext } from '../../context/ContextPokemons';
import { PokemonsContextType } from '../../interfaces/Interfaces';
import { contextMock } from '../../mocks/PokemonContext.mock';
import { pokemonChamanderMock } from '../../mocks/Pokemon.mock';

const contextMockObject:PokemonsContextType = new contextMock();

function renderComponentContext(contextMockObject:PokemonsContextType) {
  return render(
    <PokemonsContext.Provider value={ contextMockObject }>
      <PokemonItem pokemon={ pokemonChamanderMock }/>
    </PokemonsContext.Provider>
  );
}

test('Show pokemon image', () => {
  renderComponentContext(contextMockObject);
  expect(screen.getByAltText('Foto de charmander'))
    .toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg"
    );
});

test('Show title Charmander', () => {
  renderComponentContext(contextMockObject);
  expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
});

test('Show pokemon number', () => {
  renderComponentContext(contextMockObject);
  expect(screen.getByText(/Número 4/i)).toBeInTheDocument();
});

test('Click on pokemon', () => {
  renderComponentContext(contextMockObject);
  expect(contextMockObject.pokemonSelected.name).toEqual("charmeleon");

  fireEvent.click(screen.getByText(/Charmander/i));
  renderComponentContext(contextMockObject);
  expect(contextMockObject.pokemonSelected.name).toEqual("charmander");
});