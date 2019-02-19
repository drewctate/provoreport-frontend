import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-share-dialogue',
  templateUrl: './share-dialogue.component.html',
  styleUrls: ['./share-dialogue.component.scss']
})
export class ShareDialogueComponent {

  constructor(public dialogRef: MatDialogRef<ShareDialogueComponent>) { }

  public cancel() {
    this.dialogRef.close();
  }

  public shareByEmail() {
    this.dialogRef.close('email');
  }

}
