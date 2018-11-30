import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullCalendarModule } from 'ng-fullcalendar';

import { AppComponent } from './app.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { EventFeedComponent } from './event-feed/event-feed.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { EventCardComponent } from './event-card/event-card.component';

import { AddToCalendarService, EventsService } from './services';
import { SavedEventsComponent } from './saved-events/saved-events.component';

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
    MainScreenComponent,
    SavedEventsComponent,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AddToCalendarService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
