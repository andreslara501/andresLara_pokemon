import { useState, useEffect } from 'react';

import './ImagePokemon.css'
import pokeball from '../../../img/pokeball.svg';
import { IPokemon } from '../../../interfaces/Interfaces';

const ImagePokemon = function (props: { pokemon: IPokemon }) {
    const [image, setImage] = useState<string>(props.pokemon.image);
    const [imageShow, setImageShow] = useState<boolean>(false);

    useEffect(() => {
        setImage(props.pokemon.image);
    }, [props]);

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

    function imageError():void {
        const imageRecursive = findUrls(props.pokemon.sprites);
        setImage(imageRecursive.length > 0 ? imageRecursive[0] : pokeball);
    }

    return (
        <div className="photo">
            <img
                alt={`Foto de ${props.pokemon.name}`}
                src={image}
                onError={imageError}
                onLoad={() => setImageShow(true)}
                className={imageShow ? 'loaded' : ''}
            />
        </div>
    );
}

export { ImagePokemon }