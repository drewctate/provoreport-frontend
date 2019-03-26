import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamoInterceptor } from './interceptors/dynamo-interceptor';

import { AppComponent } from './app.component';

import { MainScreenComponent } from './main-screen/main-screen.component';

import { AnalyticsService } from './services';

import { AdminModule } from './modules/admin/admin.module';
import { EventsModule } from './modules/events/events.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { ComponentsGlobalModule } from './components-global/components-global.module';
import { PipesGlobalModule } from './pipes-global/pipes-global.module';

import { appRoutes } from './app.routes';


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
    AdminModule,
    EventsModule,
    FeedbackModule,
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
