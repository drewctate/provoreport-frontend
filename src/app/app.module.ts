import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { EventFeedComponent } from './event-feed/event-feed.component';
import { MainScreenComponent } from './main-screen/main-screen.component';

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
    EventFeedComponent,
    MainScreenComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
