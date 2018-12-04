export interface Event {
    id: number;
    title: string;
    url: string;
    time?: string;
    location?: string;
    thumbnail: string;
    tags: string[];
}
