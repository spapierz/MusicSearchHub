import React from 'react';
import { Skeleton } from '@mui/material';

const ImageSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="229px"
      height='180px'
      sx={{
        borderRadius: '10px',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default ImageSkeleton;
