import React, { useContext, useEffect, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { MusicContext } from '../context/MusicContext';
import { useLocation, useHistory } from 'react-router-dom';
import { Artist, Genre } from '../interfaces/Music';

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
  const parts = currentPathName.split('/');
  const endingPathName = parts[parts.length - 1];

  const { fetchGenres, fetchArtists, genres, setArtist } = useContext(MusicContext);

  const handleSearch = async (value: string) => {
    try {
      await fetchGenres(currentPathName, value);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  
  const handleOptionSelect = async (selectedValue: string) => {
    try {
      const selectedGenre = genres.find(genre => genre.id === selectedValue);

      // Fetch and set artists based on the selected genre
      if (selectedGenre) {
        console.log('yes')
        const artistsResponse = await fetchArtists(currentPathName, selectedGenre.id, 'artists');
        setArtist(artistsResponse)
        history.push(`${currentPathName}/${selectedGenre.id}/artists`);
      }
    } catch (error) {
      console.error('Error handling option select:', error);
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={genres}
      getOptionLabel={(option) => option.name}
      sx={{
        width: 500,
        ml: 4,
        ...listOptionStyles,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`Search ${endingPathName.charAt(0).toUpperCase() + endingPathName.slice(1)}...`}
          onChange={(e) => handleSearch(e.target.value)}
          fullWidth
        />
      )}
      onChange={(event, value) => {
        if (value) {
          handleOptionSelect(value.id);
        }
      }}
    />
  );
};

export default SearchBar;
