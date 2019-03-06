
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HorizontalChipsDirective } from './horizontal-chips/horizontal-chips.directive';


@NgModule({
    declarations: [
        HorizontalChipsDirective
    ],
    imports: [
        BrowserModule,
        CommonModule
    ],
    exports: [
        HorizontalChipsDirective
    ]
})
export class DirectivesGlobalModule { }
