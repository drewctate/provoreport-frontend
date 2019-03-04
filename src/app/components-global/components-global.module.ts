
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePickerFieldComponent } from './date-picker-field/date-picker-field.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { SplashComponent } from './splash/splash.component';
import { StickyComponent } from './sticky/sticky/sticky.component';
import { AppMaterialModule } from '../material-config/app.material.module';


@NgModule({
    declarations: [
        DatePickerFieldComponent,
        ExpandableComponent,
        SplashComponent,
        StickyComponent
    ],
    imports: [
        AppMaterialModule,
        BrowserModule
    ],
    exports: [
        DatePickerFieldComponent,
        ExpandableComponent,
        SplashComponent,
        StickyComponent
    ]
})
export class ComponentsGlobalModule { }
