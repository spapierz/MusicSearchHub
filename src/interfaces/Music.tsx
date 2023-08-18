export interface Artist {
    id: string;
    name: string;
    image: string;
    genre: string;
    additional_genres: string;
    popularity_score: number;
}

export interface Genre {
    id: string;
    parent_id: string;
    name: string;
}

export interface MusicContextData {
    artist: Artist[];
    setArtist: React.Dispatch<React.SetStateAction<Artist[]>>;
    genres: Genre[];
    setGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
    pageTitle: string;
    fetchGenres: (currentPath: string, query: string) => Promise<Genre[]>;
    fetchArtists: (currentPath: string, id: string, subFilter: string) => Promise<Artist[]>;
    fetchArtistDetails: (currentPath: string, id: string, subFilter: string) => Promise<Artist[]>;
    searchQuery: string;
    isFavoritesPage: boolean;
    favorites: Artist[];
    addToFavorites: (movie: Artist) => void;
    removeFromFavorites: (id: string) => void;
}