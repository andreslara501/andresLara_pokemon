import React from 'react';

import axios from 'axios';

const apiService = axios.create({
    baseURL: process.env.REACT_APP_POKEAPI_URL,
    headers: {'Content-Type': 'application/json'}
});

export { apiService }