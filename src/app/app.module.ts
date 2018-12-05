import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AppMaterialModule } from './app.material.module';

import { AppComponent } from './app.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventFeedComponent } from './event-feed/event-feed.component';
import { EventFiltersComponent } from './event-filters/event-filters.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { SavedEventsComponent } from './saved-events/saved-events.component';

import { AddToCalendarService, EventsService } from './services';

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
        component: EventCalendarComponent,
      }
    ]
  },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  declarations: [
    AppComponent,
    EventCalendarComponent,
    EventCardComponent,
    EventFeedComponent,
    EventFiltersComponent,
    MainScreenComponent,
    SavedEventsComponent,
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    FullCalendarModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  providers: [
    AddToCalendarService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
