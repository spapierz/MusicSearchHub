import React from 'react';
import { CircularProgress } from '@mui/material';

const spinnerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const Spinner: React.FC = () => {
  return <div style={spinnerStyles}><CircularProgress /></div>;
};

export default Spinner;
