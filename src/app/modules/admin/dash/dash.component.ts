import { Component } from '@angular/core';
import { DashService } from '../services/dash.service';
import { HarvestRecord } from 'src/app/types/harvest-record/harvest-record.type';
import { SplashService } from 'src/app/services';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {
  public harvestRecords: HarvestRecord[] = [];

  constructor(
    private dashService: DashService,
    private splashService: SplashService
  ) {
    this.dashService.getHarvestRecords()
      .then(records => this.harvestRecords = records)
      .then(_ => this.splashService.hide());
  }

}
