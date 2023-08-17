import React, { useContext } from 'react';
import { ArtistContext } from '../context/ArtistContext';
import { Typography } from '@mui/material';

export const PageTitle: React.FC = () => {
  const { pageTitle } = useContext(ArtistContext);

  return (
    <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: 500 }}>
      {pageTitle}
    </Typography>
  );
};

export default PageTitle;
