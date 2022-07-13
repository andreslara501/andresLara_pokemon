import { render, screen, fireEvent } from '@testing-library/react';

import { NavBar } from './NavBar';
import { PokemonsContext } from '../../../context/ContextPokemons';
import { PokemonsContextType } from '../../../interfaces/Interfaces';
import { contextMock } from '../../../mocks/PokemonContext.mock';

const contextMockObject:PokemonsContextType = new contextMock();

function renderComponentContext(contextMockObject:PokemonsContextType) {
  return render(
    <PokemonsContext.Provider value={ contextMockObject }>
      <NavBar />
    </PokemonsContext.Provider>
  );
}

test('Show title app', () => {
  renderComponentContext(contextMockObject);
  expect(screen.getByText(/Atrás/i)).toBeInTheDocument();
  expect(screen.getByText(/Siguiente/i)).toBeInTheDocument();
});

test('Show pagination text Página 1 / 1', () => {
  contextMockObject.page = 1;
  renderComponentContext(contextMockObject);
  expect(screen.getByText("1 / 1")).toBeInTheDocument();
});

test('Click on next page', () => {
  contextMockObject.page = 5;
  localStorage.setItem('REACT_POKEMONS_COUNTER', "200");
  renderComponentContext(contextMockObject);
  expect(screen.getByText("5 / 20")).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Siguiente/i));
  renderComponentContext(contextMockObject);
  expect(screen.getByText("6 / 20")).toBeInTheDocument();
});

test('Click on back page', () => {
  contextMockObject.page = 5;
  localStorage.setItem('REACT_POKEMONS_COUNTER', "200");
  renderComponentContext(contextMockObject);
  expect(screen.getByText("5 / 20")).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Atrás/i));
  renderComponentContext(contextMockObject);
  expect(screen.getByText("4 / 20")).toBeInTheDocument();
});

test('Disabled back button when page is 1', () => {
  contextMockObject.page = 1;
  localStorage.setItem('REACT_POKEMONS_COUNTER', "200");
  renderComponentContext(contextMockObject);
  expect(screen.getByText(/Atrás/i).closest('button')).toBeDisabled();
});

test('Disabled next button when page is 20 / 20', () => {
  contextMockObject.page = 20;
  localStorage.setItem('REACT_POKEMONS_COUNTER', "200");
  renderComponentContext(contextMockObject);
  expect(screen.getByText(/Siguiente/i).closest('button')).toBeDisabled();
});