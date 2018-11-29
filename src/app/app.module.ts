import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullCalendarModule } from 'ng-fullcalendar';

import { AppComponent } from './app.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { EventFeedComponent } from './event-feed/event-feed.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { EventCardComponent } from './event-card/event-card.component';

import { EventsService } from './services';

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
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
