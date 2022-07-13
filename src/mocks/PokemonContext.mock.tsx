import { IPokemon } from '../interfaces/Interfaces';
import { pokemonCharmeleonMock, pokemonChamanderMock, pokemonMock } from './Pokemon.mock'
const pokemonDefault:IPokemon = pokemonMock;

class contextMock {
  public page: number = 3;
  public querySearch: string = "charmeleon";
  public pokemons: IPokemon[] = [ pokemonCharmeleonMock, pokemonChamanderMock ];
  public pokemonSelected: IPokemon = pokemonCharmeleonMock;

  public setPage = (page: number): void => { this.page = page };
  public setQuerySearch = (query: string): void => { this.querySearch = query };
  public setPokemonSelected = (pokemon: IPokemon): void => { this.pokemonSelected = pokemon };
  public backPokemons = (): void => { this.page-- };
  public nextPokemons = (): void => { this.page++ };
  public closePokemon = (): void => { this.pokemonSelected = pokemonDefault};
};

export { contextMock }