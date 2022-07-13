import axios from 'axios';
import { IPokemon, IPokemonApi } from "../interfaces/Interfaces";

const getFilterPokemons = async(page:number, query:string) => {

    const pokemons_by_pagination:number = parseInt(process.env.REACT_APP_POKEMONS_BY_PAGINATION || '4');
    const start:number = (page - 1) * pokemons_by_pagination;
    const end = start + pokemons_by_pagination;

    return new Promise<IPokemonApi[]>(async (resolve, reject) => {
        try {
            let pokemons:IPokemonApi[] = [];

            if (localStorage.getItem('REACT_POKEMONS')) {
                pokemons = JSON.parse(localStorage.getItem('REACT_POKEMONS') || '');
            } else {
                const { data: { results } } : { data: { results: IPokemonApi[] } } =
                await axios.get(`${process.env.REACT_APP_POKEAPI_URL}api/v2/pokemon?limit=1154`);

                pokemons = results;

                localStorage.setItem('REACT_POKEMONS', JSON.stringify(pokemons));
            }

            const filterPokemons = pokemons.filter((pokemon) => {
                if(pokemon["name"].toUpperCase().includes(query.toUpperCase())) return pokemon
            });

            localStorage.setItem('REACT_POKEMONS_COUNTER', JSON.stringify(filterPokemons.length));

            resolve(filterPokemons.slice(start, end));
        } catch (error) {
            reject(new Error("Can't get pokemons from API " + error));
        }
    });
}

export const getAllPokemons = async(page:number = 1, querySearch: string = '') => {
    return new Promise<IPokemon[]>(async (resolve, reject) => {
        try {
            const pokemons = await getFilterPokemons(page, querySearch);

            const pokemonsComplete =  await Promise.all(
                pokemons.map(async (pokemon:IPokemonApi) => {
                    const { data: pokemonInfo } = await axios.get(pokemon.url);
                    pokemon["id"] = pokemonInfo.id;
                    pokemon["image"] = `${process.env.REACT_APP_POKEAPI_IMAGES_URL}${pokemonInfo.id}.svg`;
                    pokemon["info"] = pokemonInfo;
                    pokemon["sprites"] = pokemonInfo.sprites;
                    pokemon["weight"] = pokemonInfo.weight;
                    pokemon["types"] = pokemonInfo.types;
                    pokemon["moves"] = pokemonInfo.moves;
                    return pokemon
                })
            );
            resolve(pokemonsComplete);
        } catch (error) {
            reject(new Error("Can't get pokemon from API " + error));
        }
    });
}


