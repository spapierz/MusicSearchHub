import React from 'react';
import { Button, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

const BackButton: React.FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={handleGoBack}
        sx={{
          borderColor: '#FF007F',
          color: '#FF007F',
          textTransform: 'none',
          fontWeight: 500,
          mt: 3,
          '&:hover': {
            backgroundColor: '#FF007F',
            color: '#ffffff',
          },
        }}
      >
        Back
      </Button>
    </Box>
  );
};

export default BackButton;
