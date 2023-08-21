import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import FavoritesButton from './FavoritesButton';

const containerStyles = {
  alignItems: 'center',  // Align items vertically in the middle
}

const logoStyles = {
  width: '10rem',
  height: 'auto',
  padding: '3rem 0 2rem 0',
  cursor: 'pointer'
}

const Header: React.FC = () => {
  const history = useHistory();
  const logo = '/images/genreGaze-logo.png';

  return (
    <Grid container sx={containerStyles}>
      <Grid item xs={6}>
        <img style={logoStyles} src={logo} onClick={e => history.push('/')} alt='Back to (Home) genre search' />
      </Grid>
      <Grid item xs={6}>
        <FavoritesButton />
      </Grid>
    </Grid>
  );
};

export default Header;
