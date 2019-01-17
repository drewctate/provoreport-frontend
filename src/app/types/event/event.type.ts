export interface Event {
    id: string;
    title: string;
    url: string;
    time?: string;
    startDate: string;
    endDate: string;
    location?: string;
    thumbnail: string;
    tags: string[];
}
