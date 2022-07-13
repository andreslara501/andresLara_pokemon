import { FunctionComponent, InputHTMLAttributes } from 'react';
import './CustomInput.css';
import search from '../../../img/search.svg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: string | number;
    type: string;
}

const CustomInput: FunctionComponent<InputProps> = function ({ value, type, ...rest }) {
    return (
        <div id="search">
            <img src={search} alt="Search icon" />
            <input value={value} type={type} {...rest} />
        </div>
    )
}

export { CustomInput }