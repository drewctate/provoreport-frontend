import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/material-config/app.material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackDialogueComponent } from './feedback-dialogue/feedback-dialogue.component';

@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule,
    FormsModule
  ],
  declarations: [FeedbackComponent, FeedbackDialogueComponent],
  entryComponents: [FeedbackDialogueComponent],
  exports: [FeedbackComponent]
})
export class FeedbackModule { }
