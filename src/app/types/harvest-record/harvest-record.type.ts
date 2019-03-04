export interface SourceHarvestRecord {
    funcName: string;
    errorMsg?: string;
    // Following three are only applicable if the function doesn't error
    eventsFound?: number;
    eventsDuplicate?: number;
    eventsAdded?: number;
}

export interface HarvestRecord {
    id: string;
    harvestDateTime: string;
    sources: (SourceHarvestRecord)[];
}
