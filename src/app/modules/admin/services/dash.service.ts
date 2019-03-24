import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HarvestRecord } from 'src/app/types/harvest-record/harvest-record.type';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  public harvestRecords = [];

  constructor(private http: HttpClient) { }

  /**
   * Returns the harvest records
   */
  public getHarvestRecords(): Promise<HarvestRecord[]> {
    return new Promise<HarvestRecord[]>((resolve, reject) => {
      this.http.get(`${environment.ROOT_URL}/harvestrecords`)
        .subscribe(res => {
          resolve(<HarvestRecord[]>res);
        }, reject);
    });
  }
}
