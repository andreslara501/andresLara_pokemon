import { useContext } from 'react';
import { PokemonsContextType, IPokemon } from '../../interfaces/Interfaces';
import { PokemonsContext } from '../../context/ContextPokemons';
import { ImagePokemon } from '../UI/imagePokemon/ImagePokemon';
import './Description.css';
import forestBackground from '../../img/forest.jpg';
import pokeball from '../../img/pokeball.svg';
import close from '../../img/close.svg';

function Description () {
    const { pokemonSelected: pokemon, closePokemon } : { pokemonSelected: IPokemon, closePokemon: any } = useContext(PokemonsContext) as PokemonsContextType;
    const imagesRecursive = findUrls(pokemon.sprites);

    function findUrls(obj: any) {
        let urls = [];
        for (const key in obj) {
            if (typeof obj[key] === "string") {
                if (obj[key].startsWith("http") || obj[key].startsWith("ftp")) {
                    urls.push(obj[key]);
                }
            } else if (obj[key] !== null && typeof obj[key] === "object") {
                findUrls(obj[key]);
            }
        }
        return urls;
    }

    function uppercase (string: string): string {
        return string.length ? `${string[0].toUpperCase()}${string.substring(1)}` : '';
    }

    function liStyles() {
        return {
            background: `url(${pokeball}) no-repeat 0px center`,
            backgroundSize: '15px 10px',
            paddingLeft: '16px'
        }
    }

    return (
        <aside style={{"display": pokemon.name.length ? '' : 'none'}}>
            <div id="close" onClick={closePokemon} data-testid="close">
                <img src={close} alt="Close" />
            </div>
            <div id="imageContent" style={{ background: `url("${forestBackground}") round` }}>
                <div id="degrade" />
                <ImagePokemon pokemon={ pokemon }/>
            </div>
            <div id="info">
                <h2>{uppercase(pokemon.name)}</h2>
                <h3>Número { pokemon.id }</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>Peso</th>
                            <td>{ pokemon.weight }</td>
                        </tr>
                        <tr>
                            <th>Tipo</th>
                            <td>
                                <ul>
                                    {pokemon["types"].map(
                                        (typePokemon) => {
                                            return (
                                                <li key={ typePokemon.type.name } style={ liStyles() }>
                                                    { uppercase(typePokemon.type.name) }
                                                </li>
                                            )
                                        }
                                    )}
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th>Movimientos</th>
                            <td>
                                <ul id="moves">
                                    {pokemon["moves"].map(
                                        (typePokemon) => {
                                            return (
                                                <li key={ typePokemon.move.name } style={ liStyles() }>
                                                    { uppercase(typePokemon.move.name) }
                                                </li>
                                            )
                                        }
                                    )}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div id="sprites">
                    <h3>Sprites</h3>
                    <div id="images">
                        {imagesRecursive.map(
                            (sprite, index) => {
                                return (
                                    <img src={ sprite } alt={`Sprite ${ index + 1 }`}  key={ sprite } />
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        </aside>
    )
}

export { Description }