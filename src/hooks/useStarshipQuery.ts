import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getStarships, searchStarships } from '../api/starWarsApi';
import { Starship } from '../types/starshipTypes';

// Custom Hook to Fetch All Starships
export const useStarships = () => {
    return useQuery<Starship[], Error>({
        queryKey: ['starships'],
        queryFn: getStarships,
    });
};

// Custom Hook to Search for Starships
export const useSearchStarships = (query: string) => {
    return useQuery<Starship[], Error>({
        queryKey: ['starships', query],
        queryFn: () => searchStarships(query),
        enabled: !!query && query.length > 2, // Only run query if the query length is greater than 2
    });
};