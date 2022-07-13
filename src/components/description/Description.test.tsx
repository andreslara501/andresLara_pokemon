import { render, screen, fireEvent, queryByAttribute } from '@testing-library/react';

import { Description } from './Description';
import { PokemonsContext } from '../../context/ContextPokemons';
import { PokemonsContextType } from '../../interfaces/Interfaces';
import { contextMock } from '../../mocks/PokemonContext.mock';

const contextMockObject:PokemonsContextType = new contextMock();

function renderComponentContext(contextMockObject:PokemonsContextType) {
  return render(
    <PokemonsContext.Provider value={ contextMockObject }>
      <Description/>
    </PokemonsContext.Provider>
  );
}

test('Show pokemon image', () => {
  renderComponentContext(contextMockObject);
  expect(screen.getByAltText('Foto de charmeleon'))
    .toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg"
    );
});

test('Show title Charmeleon', () => {
  renderComponentContext(contextMockObject);
  expect(screen.getByText(/Charmeleon/i)).toBeInTheDocument();
});

test('Show pokemon number', () => {
  renderComponentContext(contextMockObject);
  expect(screen.getByText(/Número 5/i)).toBeInTheDocument();
});

test('Show titles, weight, type and moves', () => {
  renderComponentContext(contextMockObject);

  expect(screen.getAllByRole('row')[0]).toHaveTextContent('Peso');
  expect(screen.getAllByRole('row')[0]).toHaveTextContent('190');

  expect(screen.getAllByRole('row')[1]).toHaveTextContent('Tipo');
  expect(screen.getAllByRole('row')[2]).toHaveTextContent('Fire');

  expect(screen.getAllByRole('row')[2]).toHaveTextContent('Movimientos');
  expect(screen.getAllByRole('row')[2]).toHaveTextContent('Mega-punch');
});

test('Show sprites', () => {
  renderComponentContext(contextMockObject);

  expect(screen.getByAltText('Sprite 1'))
    .toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/5.png"
    );
  expect(screen.getByAltText('Sprite 2'))
    .toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/5.png"
    );
});

test('Click on pokemon', () => {
  renderComponentContext(contextMockObject);

  const getById = screen.queryByTestId('close');
  if (getById) fireEvent.click(getById);

  renderComponentContext(contextMockObject);
  expect(contextMockObject.pokemonSelected.name).toEqual("");
});