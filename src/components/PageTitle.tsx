import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import { Typography } from '@mui/material';

export const PageTitle: React.FC = () => {
  const { pageTitle } = useContext(MusicContext);

  return (
    <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: 500 }}>
      {pageTitle}
    </Typography>
  );
};

export default PageTitle;
