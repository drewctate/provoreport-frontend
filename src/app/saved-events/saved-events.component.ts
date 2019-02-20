import { Component, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { EventsService } from '../services';
import { Event } from '../types';
import { ShareDialogueComponent } from './share-dialogue/share-dialogue.component';
import { EmailDialogueComponent } from './email-dialogue/email-dialogue/email-dialogue.component';

@Component({
  selector: 'app-saved-events',
  templateUrl: './saved-events.component.html',
  styleUrls: ['./saved-events.component.scss']
})
export class SavedEventsComponent {
  @Input() hideNav: boolean;

  constructor(
    public eventsService: EventsService,
    public dialog: MatDialog
  ) { }

  get savedEvents() {
    return this.eventsService.savedEvents;
  }

  public unSaveEvent(event: Event) {
    this.eventsService.unSaveEvent(event);
  }

  public shareSavedEvents(events: Event[]) {
    const shareDialogRef = this.dialog.open(ShareDialogueComponent, {
      data: { events: events }
    });
    shareDialogRef.afterClosed().subscribe(res => {
      if (res === 'email') {
        const emailDialogRef = this.dialog.open(EmailDialogueComponent, { width: '500px' });
        emailDialogRef.afterClosed().subscribe(emailDialogueRes => {
          this.eventsService.shareEvents(events, emailDialogueRes.senderName, emailDialogueRes.recipients);
        });
      }
    });
  }
}
