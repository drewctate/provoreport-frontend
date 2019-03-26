import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-feedback-dialogue',
  templateUrl: './feedback-dialogue.component.html',
  styleUrls: ['./feedback-dialogue.component.scss']
})
export class FeedbackDialogueComponent {

  public feedback = {
    name: '',
    email: '',
    message: ''
  };

  constructor(public dialogRef: MatDialogRef<FeedbackDialogueComponent>, ) { }

  public sendFeedback() {
    this.dialogRef.close(this.feedback);
  }

}
