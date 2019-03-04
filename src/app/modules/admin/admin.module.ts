import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash/dash.component';

import { PipesGlobalModule } from 'src/app/pipes-global/pipes-global.module';

@NgModule({
  imports: [
    CommonModule,
    PipesGlobalModule
  ],
  declarations: [DashComponent]
})
export class AdminModule { }
