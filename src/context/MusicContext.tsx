import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Artist, Genre, MusicContextData } from '../interfaces/Music';

interface MusicContextProviderProps {
    children: ReactNode;
}

export const MusicContext = createContext<MusicContextData>({} as MusicContextData);

  const MusicContextProvider: React.FC<MusicContextProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Artist[]>([]);
  const [isFavoritesPage, setIsFavoritesPage] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [artist, setArtist] = useState<Artist[]>([]);

  const API_BASE_URL = 'https://music.musicaudience.info/api/v1/music';
  const API_KEY = '5db48e1f3a0a4580bad47849f1317bd0';
  
  const fetchGenres = async (currentPath: string, query: string): Promise<Genre[]> => {
    const url = `${API_BASE_URL}${currentPath}?q=${query}`;
    const response = await axios.get(url, {
        params: {
            apikey: API_KEY,
        },
    });
    const { data: { data } } = response;
    if (data?.length) {
        setGenres(data as Genre[]);
        if (query) {
            setSearchQuery(query);
        }
    } else {
        setSearchQuery('');
    }
    if (!response.data || !response.data.data) {
        throw new Error('Error connecting to the API');
    }
    return data as Genre[];
  };

  const fetchArtists = async (
    currentPath: string,
    id: string,
    subFilter: string
  ): Promise<Artist[]> => {
    const url = `${API_BASE_URL}${currentPath}/${id}/artists`;
    const response = await axios.get(url, {
      params: {
          apikey: API_KEY,
          limit: 50
      },
    });

    const { data: { data } } = response;

    if (data?.length) {
        setArtist(data as Artist[]);
        setGenres([]); // Reset genres when fetching artists
    }
    if (!response.data || !response.data.data) {
        throw new Error('Error connecting to the API');
    }
    return data as Artist[];
  };

  const fetchArtistDetails = async (
    currentPath: string,
    id?: string,
    subFilter?: string
  ): Promise<Artist[]> => {
      const url = `${API_BASE_URL}${currentPath}/${id}/${subFilter}`;
      const response = await axios.get(url, {
          params: {
              apikey: API_KEY,
          },
      });
      const { data: { data } } = response;
      if (data?.length) {
          setArtist(data as Artist[]);
          setGenres([]); // Reset genres when fetching artist details
      }
      if (!response.data || !response.data.data) {
          throw new Error('Error connecting to the API');
      }
      return data as Artist[];
  };

  const addToFavorites = useCallback((artist: Artist) => {
      setFavorites(prevFavorites => [...prevFavorites, artist]);
  }, [setFavorites]);

  const removeFromFavorites = useCallback((id: string) => {
      setFavorites(prevFavorites => prevFavorites.filter(artist => artist.id !== id));
  }, [setFavorites]);

  useEffect(() => {
      setPageTitle('Home');
      console.log(artist)
  }, []);

  const contextValue = useMemo<MusicContextData>(
      () => ({
          genres,
          setGenres,
          artist,
          setArtist,
          pageTitle,
          fetchGenres,
          fetchArtists,
          fetchArtistDetails,
          searchQuery,
          isFavoritesPage,
          favorites,
          addToFavorites,
          removeFromFavorites
      }),
      [genres, setGenres, artist, setArtist, pageTitle, fetchGenres, fetchArtists, fetchArtistDetails, searchQuery, isFavoritesPage, favorites, addToFavorites, removeFromFavorites]
  );

  return (
      <MusicContext.Provider value={contextValue}>
          {children}
      </MusicContext.Provider>
  );
};

export default MusicContextProvider;
