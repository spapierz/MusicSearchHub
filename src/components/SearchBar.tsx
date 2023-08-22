import React, { useCallback, useContext, useMemo, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { MusicContext } from '../context/MusicContext';
import { useLocation, useHistory } from 'react-router-dom';
import { Genre } from '../interfaces/Music';
import PageTitle from './PageTitle';

const listOptionStyles = {
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover": {
    backgroundColor: "#FF007F",
    color: '#ffffff'
  },
  "& + .MuiAutocomplete-popper li": {
    padding: 1.5
  }
};

const SearchBar = () => {
  const history = useHistory();
  const location = useLocation();
  const currentPathName = location.pathname;

  const { fetchGenres, genres } = useContext(MusicContext);
  const [searchValue, setSearchValue] = useState('');

  const handleOptionSelect = (selectedValue: string) => {
    try {
      const selectedGenre = genres.find(genre => genre.id === selectedValue);

      if (selectedGenre) {
        history.push(`${currentPathName}/${selectedGenre.id}/artists`);
        if (location.pathname.includes('/artist')) {
          const newPath = location.pathname.replace(/\/\d+\//, `/${selectedGenre.id}/`);
          history.push(newPath);
        }
        setSearchValue(selectedValue)
      }
    } catch (error) {
      console.error('Error handling option select:', error);
    }
  };

  const fetchAndFilterGenres = useCallback((value: string) => {
    const res = fetchGenres(currentPathName, value);
    return res;
  }, [currentPathName]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchAndFilterGenres(value);
  };

  const uniqueGenres = useMemo(() => {
    const uniqueGenreNames = new Set();
    const uniqueGenresArray: Genre[] = [];
  
    for (const genre of genres) {
      if (!uniqueGenreNames.has(genre.name)) {
        uniqueGenreNames.add(genre.name);
        uniqueGenresArray.push(genre);
      }
    }
  
    return uniqueGenresArray;
  }, [genres]);  
console.log('hi')

  return (
    <>
      <PageTitle/>
      <Autocomplete
        disablePortal
        options={uniqueGenres}
        getOptionLabel={(option) => option.name}
        sx={{
          width: 500,
          mt: 1.5,
          ...listOptionStyles,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Search Genres'}
            onChange={(e) => handleSearch(e.target.value)}
            fullWidth
          />
        )}
        onChange={(event, value) => {
          if (event && value) {
            handleOptionSelect(value.id);
          }
        }}
      />
    </>
  );
};

export default SearchBar;
