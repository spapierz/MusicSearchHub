import { Grid } from '@mui/material';
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
      <img
        src={logo}
        alt="Back to (Home) genre search"
        width="200px"
        height="100px"
        onClick={() => history.push('/')}
        style={{
          maxWidth: '150px',
          height: 'auto',
          padding: '3rem 0px 2rem',
          cursor: 'pointer'
        }}
      />
      </Grid>
      <Grid item xs={6}>
        <FavoritesButton />
      </Grid>
    </Grid>
  );
};

export default Header;
