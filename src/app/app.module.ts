import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamoInterceptor } from './interceptors/dynamo-interceptor';

import { FullCalendarModule } from 'ng-fullcalendar';
import { StickyModule } from 'ng2-sticky-kit';
import { AppMaterialModule } from './app.material.module';

import { AppComponent } from './app.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventFeedComponent } from './event-feed/event-feed.component';
import { EventFiltersComponent } from './event-filters/event-filters.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { SavedEventsComponent } from './saved-events/saved-events.component';
import { DatePickerFieldComponent } from './date-picker-field/date-picker-field.component';

import { AddToCalendarService, EventsService, EventFiltersService } from './services';

import { EventTagsFilterPipe } from './pipes';

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
    DatePickerFieldComponent,
    EventCalendarComponent,
    EventCardComponent,
    EventFeedComponent,
    EventFiltersComponent,
    MainScreenComponent,
    SavedEventsComponent,

    // Pipes
    EventTagsFilterPipe
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    ),
    StickyModule
  ],
  providers: [
    AddToCalendarService,
    EventsService,
    EventFiltersService,
    { provide: HTTP_INTERCEPTORS, useClass: DynamoInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
