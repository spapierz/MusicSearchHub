import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Artist, Genre, MusicContextData } from '../interfaces/Music';

interface MusicContextProviderProps {
  children: ReactNode;
}

export const MusicContext = createContext<MusicContextData>({} as MusicContextData);

  const MusicContextProvider: React.FC<MusicContextProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Artist[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [isFavoritesPage, setIsFavoritesPage] = useState(false);
  const [pageTitle, setPageTitle] = useState('Enter a genre to find artists');
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [artist, setArtist] = useState<Artist[]>([]);

  const API_BASE_URL = 'https://music.musicaudience.info/api/v1/music';
  const API_KEY = '5db48e1f3a0a4580bad47849f1317bd0';
  
  const fetchGenres = async (currentPath: string, query: string): Promise<Genre[]> => {
    const url = `${API_BASE_URL}/genres?q=${query}`;
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

  const fetchArtists = useCallback(async (
    currentPath: string,
    id: string,
  ): Promise<Artist[]> => {
    const url = `${API_BASE_URL}${currentPath}/${id}/artists`;
    
    const { data: { data } } = await axios.get(url, {
      params: {
        apikey: API_KEY,
      },
    });

    if (data.length) {
      setArtist(data as Artist[]);
      setGenres(genres as Genre[]); // Reset genres when fetching artists
    }
    if (!data) {
        throw new Error('Error connecting to the API');
    }
    return data as Artist[];
  }, []);

  const fetchArtistDetails = async (
    id?: string,
  ): Promise<Artist[]> => {
      const url = `${API_BASE_URL}/artists/${id}`;
      const { data: { data } } = await axios.get(url, {
        params: {
          apikey: API_KEY,
        },
      });

      if (data?.length) {
        setArtist(data as Artist[]);
        setGenres([]); // Reset genres when fetching artist details
      }
      if (!data) {
        throw new Error('Error connecting to the API');
      }
      return data as Artist[];
  };

  // Load favorites from local storage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        const parsedFavorites: Artist[] = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
    }
    setFavoritesLoaded(true);
}, []);

  // Save favorites to local storage whenever 'favorites' state changes
  useEffect(() => {
    if (favoritesLoaded) {
        const favoritesToSave = JSON.stringify(favorites);
        localStorage.setItem('favorites', favoritesToSave);
    }

    if (!favorites.length) {
        setIsFavoritesPage(false);
    }
}, [favorites, favoritesLoaded]);

  const addToFavorites = useCallback((artist: Artist) => {
    setFavorites(prevFavorites => [...prevFavorites, artist]);
  }, [setFavorites]);

  const removeFromFavorites = useCallback((id: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(artist => artist.id !== id));
  }, [setFavorites]);

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
