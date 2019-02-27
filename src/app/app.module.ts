import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamoInterceptor } from './interceptors/dynamo-interceptor';

import { FullCalendarModule } from 'ng-fullcalendar';
import { AppMaterialModule } from './material-config/app.material.module';

import { AppComponent } from './app.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventFeedComponent } from './event-feed/event-feed.component';
import { EventFiltersComponent } from './event-filters/event-filters.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { SavedEventsComponent } from './saved-events/saved-events.component';
import { ShareDialogueComponent } from './saved-events/share-dialogue/share-dialogue.component';
import { DatePickerFieldComponent } from './date-picker-field/date-picker-field.component';

import { AddToCalendarService, AnalyticsService, EventsService, EventFiltersService } from './services';

import { EventTagsFilterPipe, DecodeHtmlString, CustomTitleCasePipe, SortEventsPipe } from './pipes';
import { EmailDialogueComponent } from './saved-events/email-dialogue/email-dialogue/email-dialogue.component';
import { StickyComponent } from './components/sticky/sticky/sticky.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { CustomDatePickerDialogComponent } from './event-filters/custom-date-picker-dialog/custom-date-picker-dialog.component';


const appRoutes: Routes = [
  {
    path: '',
    component: MainScreenComponent,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
      },
      {
        path: 'feed',
        component: EventFeedComponent,
      },
      {
        path: 'calendar',
        redirectTo: 'feed'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    // Components
    AppComponent,
    CustomDatePickerDialogComponent,
    DatePickerFieldComponent,
    EmailDialogueComponent,
    EventCalendarComponent,
    EventCardComponent,
    EventFeedComponent,
    EventFiltersComponent,
    ExpandableComponent,
    MainScreenComponent,
    SavedEventsComponent,
    ShareDialogueComponent,
    StickyComponent,

    // Pipes
    EventTagsFilterPipe,
    DecodeHtmlString,
    CustomTitleCasePipe,
    SortEventsPipe,
  ],
  entryComponents: [
    CustomDatePickerDialogComponent,
    EmailDialogueComponent,
    ShareDialogueComponent,
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  providers: [
    AddToCalendarService,
    AnalyticsService,
    EventsService,
    EventFiltersService,
    { provide: HTTP_INTERCEPTORS, useClass: DynamoInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
