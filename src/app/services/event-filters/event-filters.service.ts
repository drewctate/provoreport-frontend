import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventFiltersService {

  private _selectedTags: string[] = [];

  constructor() { }

  get selectedTags() {
    return this._selectedTags;
  }

  set selectedTags(tags: string[]) {
    this._selectedTags = tags;
  }
}
