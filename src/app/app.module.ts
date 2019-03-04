import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamoInterceptor } from './interceptors/dynamo-interceptor';

import { AppComponent } from './app.component';
import { EventFeedComponent } from './events/event-feed/event-feed.component';
import { MainScreenComponent } from './main-screen/main-screen.component';

import { AnalyticsService } from './services';

import { EventsModule } from './events/events.module';
import { ComponentsGlobalModule } from './components-global/components-global.module';
import { PipesGlobalModule } from './pipes-global/pipes-global.module';



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
      }
    ]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    // Components
    AppComponent,
    MainScreenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    ),

    // In-app
    EventsModule,
    ComponentsGlobalModule,
    PipesGlobalModule
  ],
  providers: [
    AnalyticsService,
    { provide: HTTP_INTERCEPTORS, useClass: DynamoInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
