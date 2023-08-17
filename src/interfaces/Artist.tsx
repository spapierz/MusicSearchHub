export interface Artist {
    id: string;
    name: string;
    image: string;
    genres: string;
    additional_genres: string;
    popularity_score: number;
}

export interface ArtistContextData {
    pageTitle: string;
    searchMusic: (currentPath: string, query: string, id?: string, subFilter?: string) => Promise<void>;
    searchQuery: string;
    isFavoritesPage: boolean;
}