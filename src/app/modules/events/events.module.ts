
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomDatePickerDialogComponent } from './event-filters/custom-date-picker-dialog/custom-date-picker-dialog.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EmailDialogueComponent } from './saved-events/email-dialogue/email-dialogue.component';
import { EventFeedComponent } from './event-feed/event-feed.component';
import { EventFiltersComponent } from './event-filters/event-filters.component';
import { SavedEventsComponent } from './saved-events/saved-events.component';
import { ShareDialogueComponent } from './saved-events/share-dialogue/share-dialogue.component';

import { AddToCalendarService, EventsService, EventFiltersService } from './services';

import { EventTagsFilterPipe, CustomTitleCasePipe, DecodeHtmlString } from './pipes';
import { ComponentsGlobalModule } from '../../components-global/components-global.module';
import { AppMaterialModule } from '../../material-config/app.material.module';
import { PipesGlobalModule } from '../../pipes-global/pipes-global.module';

@NgModule({
    declarations: [
        CustomDatePickerDialogComponent,
        EventCardComponent,
        EmailDialogueComponent,
        EventFeedComponent,
        EventFiltersComponent,
        SavedEventsComponent,
        ShareDialogueComponent,

        // Pipes
        EventTagsFilterPipe,
        CustomTitleCasePipe,
        DecodeHtmlString
    ],
    imports: [
        AppMaterialModule,
        BrowserModule,
        ComponentsGlobalModule,
        PipesGlobalModule,
        ReactiveFormsModule
    ],
    exports: [
        SavedEventsComponent,
        EventFeedComponent,
        EventFiltersComponent
    ],
    entryComponents: [
        CustomDatePickerDialogComponent,
        EmailDialogueComponent,
        ShareDialogueComponent,
    ],
    providers: [
        AddToCalendarService,
        EventsService,
        EventFiltersService
    ]
})
export class EventsModule { }
