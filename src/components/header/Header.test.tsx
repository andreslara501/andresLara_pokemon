import { render, screen } from '@testing-library/react';

import { Header } from './Header';
import { PokemonsContext } from '../../context/ContextPokemons';
import { PokemonsContextType } from '../../interfaces/Interfaces';
import { contextMock } from '../../mocks/PokemonContext.mock';

const contextMockObject:PokemonsContextType = new contextMock();

function renderComponentContext() {
  return render(
    <PokemonsContext.Provider value={ contextMockObject }>
      <Header />
    </PokemonsContext.Provider>
  );
}

test('Show title app', () => {
  renderComponentContext();
  expect(screen.getByText(/Listado de Pokemón/i)).toBeInTheDocument();
});

test('Input text with context value', () => {
  renderComponentContext();
  const searchBox:HTMLInputElement = screen.getByPlaceholderText("Buscar pokemones");
  expect(searchBox.value).toEqual("charmeleon");
});

test('Input text Update with context value', () => {
  contextMockObject.setQuerySearch('pika');
  renderComponentContext();
  const searchBox:HTMLInputElement = screen.getByPlaceholderText("Buscar pokemones");
  expect(searchBox.value).toEqual("pika");
});