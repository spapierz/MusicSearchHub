export interface Artist {
    id: string;
    name: string;
    image: string;
    genres: Genre[];
    popularity: number;
}

export interface Genre {
    id: number;
    name: string;
    parent_id: string;
    is_primary: number;
}

export interface MusicContextData {
    artist: Artist[];
    genres: Genre[];
    pageTitle: string;
    searchQuery: string;
    isFavoritesPage: boolean;
    favorites: Artist[];
    setArtist: React.Dispatch<React.SetStateAction<Artist[]>>;
    setGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
    fetchGenres: (query: string) => Promise<Genre[]>;
    fetchArtists: (id: string) => Promise<Artist[]>;
    fetchArtistDetails: (id: string) => Promise<Artist[]>;
    addToFavorites: (movie: Artist) => void;
    removeFromFavorites: (id: string) => void;
}