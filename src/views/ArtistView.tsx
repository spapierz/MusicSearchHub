import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import ArtistItem from '../components/ArtistItem';
import { Artist } from '../interfaces/Music';

const ArtistView: React.FC = () => {
    const { artist, setArtist, fetchArtists, fetchArtistDetails } = useContext(MusicContext);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artistResponse = await fetchArtistDetails(`/genres`, id, 'artists') as Artist[];
                setArtist(artistResponse);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };
        
        fetchArtists();
    }, []);

    return (
        <Grid container spacing={3} sx={{ mt: 0 }} role="list">
            {artist.map((artistItem) => (
                <Grid item xs={5} sm={3} md={2} key={artistItem.id} role="listitem">
                    <ArtistItem artist={artistItem} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ArtistView;
