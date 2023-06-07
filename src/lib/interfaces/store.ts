export interface Game {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    showMore: boolean;
}

export interface Cart {
    games: Game[];
}