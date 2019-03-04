import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DateRange } from '../../../../types';
import { Moment } from 'moment';


@Component({
  selector: 'app-custom-date-picker-dialog',
  templateUrl: './custom-date-picker-dialog.component.html',
  styleUrls: ['./custom-date-picker-dialog.component.scss']
})
export class CustomDatePickerDialogComponent {

  private currentRange: DateRange;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { activeDateRange: DateRange },
    private matDialogRef: MatDialogRef<CustomDatePickerDialogComponent>
  ) {
    this.currentRange = this.data.activeDateRange;
  }

  public startDateTimeChanged(start: Moment) {
    this.currentRange.start = start;
  }

  public endDateTimeChanged(end: Moment) {
    this.currentRange.end = end;
  }

  public cancel() {
    this.matDialogRef.close();
  }

  public ok() {
    this.matDialogRef.close(this.currentRange);
  }

}
