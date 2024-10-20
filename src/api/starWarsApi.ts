import axios from 'axios';
import { Starship } from '../types/starshipTypes';

const BASE_URL = 'https://swapi.dev/api';

export const getStarships = async (): Promise<Starship[]> => {
    const response = await axios.get(`${BASE_URL}/starships/`);
    return response.data.results;
};

export const searchStarships = async (query: string): Promise<Starship[]> => {
    const response = await axios.get(`${BASE_URL}/starships/?search=${query}`);
    return response.data.results;
};
