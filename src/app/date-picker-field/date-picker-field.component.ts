import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as moment from 'moment';

/** @title Datepicker that uses Moment.js dates */
@Component({
  selector: 'app-date-picker-field',
  templateUrl: './date-picker-field.component.html',
  styleUrls: ['./date-picker-field.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class DatePickerFieldComponent {
  @Input() placeholder: string;
  @Input() initialValue: moment.Moment;

  @Output() dateChange = new EventEmitter<moment.Moment>();

  public today: moment.Moment = moment();
  public date = new FormControl(this.today);

  public dateChanged(event: MatDatepickerInputEvent<moment.Moment>) {
    this.dateChange.emit(event.value);
  }

  // Datepicker takes `Moment` objects instead of `Date` objects.
}
