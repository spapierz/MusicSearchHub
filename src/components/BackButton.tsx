import React from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const BackToSearchButton: React.FC = () => {
  const history = useHistory();

  const handleBackToSearch = () => {
    history.goBack();
  };

  return (
    <Button variant="contained" onClick={handleBackToSearch}>
      Back to Search
    </Button>
  );
};

export default BackToSearchButton;
