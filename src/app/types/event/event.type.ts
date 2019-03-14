export interface Event {
    id: string;
    title: string;
    description: string;
    url: string;
    location: string;
    ticketsUrl: string;
    startDateTime: string;
    endDateTime: string;
    timeStr: string;
    thumbnail: string;
    past: string;
    tags: Array<string>;
}
