import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FeedbackDialogueComponent } from '../feedback-dialogue/feedback-dialogue.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  constructor(private dialog: MatDialog) { }

  public openFeedbackDialog() {
    console.log('here');
    const feedbackDialog = this.dialog.open(FeedbackDialogueComponent, { width: '500px' });
    feedbackDialog.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}
