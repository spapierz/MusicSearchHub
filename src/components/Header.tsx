import React from 'react';
import { useHistory } from 'react-router-dom';

const logoStyles = {
  width: '10rem',
  height: 'auto',
  padding: '3rem 0',
  cursor: 'pointer'
}

const Header: React.FC = () => {
  const history = useHistory();
  const logo = '/images/genreGaze-logo.png';

  return (
    <>
        <img style={logoStyles} src={logo} onClick={e => history.push('/')} alt='Back to (Home) genre search' />
    </>
  );
};

export default Header;
