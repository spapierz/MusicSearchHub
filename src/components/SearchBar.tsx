import React, { useContext } from 'react';
import { Paper, IconButton, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { ArtistContext } from '../context/ArtistContext';
import { useLocation } from 'react-router-dom';

const searchContainerStyle = {
  alignItems: 'center',
  padding: '2px 4px',
  borderRadius: '4px',
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
};

const searchIconStyle = {
  padding: 1,
  color: 'lightgrey',
};

const searchInputStyle = {
  marginLeft: '8px',
  color: 'rgba(0, 0, 0, 0.87)',
};

export const SearchBar = () => {
  const { searchMusic, searchQuery, isFavoritesPage } = useContext(ArtistContext);

  const location = useLocation();
  const currentPath = location.pathname;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    searchMusic(currentPath, value);
  };

  return (
    <Paper sx={searchContainerStyle} role="search">
      <IconButton sx={searchIconStyle}>
        <Search />
      </IconButton>
      <InputBase
        sx={searchInputStyle}
        id="search-input"
        placeholder="Search Music Genres..."
        onChange={handleChange}
        aria-label="Search Music Genres"
      />
    </Paper>
  );
};

export default SearchBar;
