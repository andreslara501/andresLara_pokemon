
export interface IPokemon {
    id: number;
    name: string;
    url: string;
    image: string;
    info: object;
    sprites: object;
    weight: number;
    types: Array<{
        "type": {
            "name" : "fire"
        }
    }>;
    moves: Array<{
        "move": {
            "name" : string
        }
    }>;
};

export interface IPokemonApi extends IPokemon {
    name: string;
    url: string;
}

export type PokemonsContextType = {
    pokemons: IPokemon[];
    pokemonSelected: IPokemon;
    setPokemonSelected: (pokemon: IPokemon) => void;
    page: number;
    setPage(page: number): void;
    backPokemons: () => void;
    nextPokemons: () => void;
    closePokemon: () => void;
    querySearch: string;
    setQuerySearch: (query: string) => void;
};