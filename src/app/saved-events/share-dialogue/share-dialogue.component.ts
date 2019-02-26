import { Component, DoCheck } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { EventsService } from 'src/app/services';

@Component({
  selector: 'app-share-dialogue',
  templateUrl: './share-dialogue.component.html',
  styleUrls: ['./share-dialogue.component.scss']
})
export class ShareDialogueComponent implements DoCheck {

  constructor(
    public dialogRef: MatDialogRef<ShareDialogueComponent>,
    private eventsService: EventsService
  ) { }

  ngDoCheck() {
    if (this.eventsService.savedEvents.length === 0) {
      this.cancel();
    }
  }

  public cancel() {
    this.dialogRef.close();
  }

  public shareByEmail() {
    this.dialogRef.close('email');
  }

}
