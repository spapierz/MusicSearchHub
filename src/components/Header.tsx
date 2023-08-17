import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const logoStyles = {
  width: '10rem',
  height: 'auto',
  padding: '2rem'
}

const Header: React.FC = () => {
  const logo = './images/genreGaze-logo.png';

  return (
    <>
        <img style={logoStyles} src={logo} />
    </>
  );
};

export default Header;
