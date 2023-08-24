import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArtistDetails from '../ArtistDetails';
import { MusicContext } from '../../context/MusicContext';

const mockContext = {
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
  favorites: [],
  genres: [],
  setGenres: jest.fn(),
  artist: [],
  setArtist: jest.fn(),
  pageTitle: '',
  fetchGenres: jest.fn(),
  fetchArtists: jest.fn(),
  similarArtists: [],
  fetchArtistDetails: jest.fn(),
  fetchSimilarArtists: jest.fn(),
  searchQuery: '',
};

const mockArtist = {
  id: '1',
  name: 'Artist Name',
  genres: [],
  image: 'image.jpg',
  popularity: 80,
};

test('renders ArtistDetails component', () => {
  render(
    <MusicContext.Provider value={mockContext}>
      <ArtistDetails artist={mockArtist} />
    </MusicContext.Provider>
  );

  expect(screen.getByText('Artist Name')).toBeInTheDocument();
  expect(screen.getByText('Primary Genre:')).toBeInTheDocument();
  expect(screen.getByText('Popularity Score: 80')).toBeInTheDocument();
});

test('clicking favorite button triggers addToFavorites or removeFromFavorites', () => {
  render(
    <MusicContext.Provider value={mockContext}>
      <ArtistDetails artist={mockArtist} />
    </MusicContext.Provider>
  );

  const favoriteButton = screen.getByLabelText('not yet favorited star icon');

  fireEvent.click(favoriteButton);

  expect(mockContext.addToFavorites).toHaveBeenCalledTimes(1);
  expect(mockContext.addToFavorites).toHaveBeenCalledWith(mockArtist);

  fireEvent.click(favoriteButton);

  expect(mockContext.removeFromFavorites).toHaveBeenCalledTimes(1);
  expect(mockContext.removeFromFavorites).toHaveBeenCalledWith(mockArtist.id);
});
