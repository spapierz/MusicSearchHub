import React from 'react';
import { CircularProgress } from '@mui/material';

const spinnerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  position: 'fixed',  // Fix the position within the viewport
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as React.CSSProperties;

const Spinner: React.FC = () => {
  return <div style={spinnerStyles}><CircularProgress /></div>;
};

export default Spinner;
