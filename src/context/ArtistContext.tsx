import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Artist, ArtistContextData } from '../interfaces/Artist';

interface ArtistContextProviderProps {
    children: ReactNode;
}

export const ArtistContext = createContext<ArtistContextData>({} as ArtistContextData);

const ArtistContextProvider: React.FC<ArtistContextProviderProps> = ({ children }) => {
    const [pageTitle, setPageTitle] = useState('');
    const [searchGenre, setSearchGenre] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFavoritesPage, setIsFavoritesPage] = useState(false);

    const API_BASE_URL = 'https://music.musicaudience.info/api/v1/music';
    const API_KEY = '5db48e1f3a0a4580bad47849f1317bd0';

    // Fetches music data from the API based on the provided query and optional parameters.
    const searchMusic = async (
        currentPath: string,
        query: string,
        id?: string,
        subFilter?: string
    ) => {
        try {
          let url = `${API_BASE_URL}${currentPath}?q=${query}`;
          
          if (id) {
            if (subFilter) {
              url = `${API_BASE_URL}/${currentPath}/${id}/${subFilter}`;
            } else {
              url = `${API_BASE_URL}/${currentPath}/${id}`;
            }
          }
          
          const response = await axios.get(url, {
            params: {
              apikey: API_KEY,
            },
          });
      
        //   if (!response.data || !response.data.results) {
        //     throw new Error('Error connecting to the API');
        //   }
          
        //   return response.data.results;
        } catch (error) {
          console.error('Error fetching music data:', error);
          throw error; // Rethrow the error to handle it in the calling component
        }
    };

    // Update the artist title whenever searchQuery or isFavoritesPage changes
    useEffect(() => {
       setPageTitle('Home')
    }, []);


    // Memoize the context value to prevent unnecessary re-rendering of consumers
    const contextValue = useMemo<ArtistContextData>(
        () => ({
            pageTitle,
            searchMusic,
            searchQuery,
            isFavoritesPage
        }),
        [pageTitle, searchGenre, searchQuery, isFavoritesPage]
    );

    return (
        <ArtistContext.Provider value={contextValue}>
            {children}
        </ArtistContext.Provider>
    );
};

export default ArtistContextProvider;
