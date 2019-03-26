import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FeedbackDialogueComponent } from '../feedback-dialogue/feedback-dialogue.component';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  constructor(private dialog: MatDialog, private feedbackService: FeedbackService) { }

  public openFeedbackDialog() {
    const feedbackDialog = this.dialog.open(FeedbackDialogueComponent, { width: '500px' });
    feedbackDialog.afterClosed().subscribe(feedback => {
      this.feedbackService.sendFeedback(feedback);
    });
  }

}
