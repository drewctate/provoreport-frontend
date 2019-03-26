import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }

  public sendFeedback(feedback: { name: string, message: string, email: string }): Promise<boolean> {
    const payload = {
      'text': `*${feedback.name} ${feedback.email ? '_(' + feedback.email + ')_ ' : ''}says:*\n\n\"${feedback.message}\"`,
      'username': 'feedbackbot',
      'mrkdwn': true
    };

    return new Promise<boolean>((resolve, reject) => {
      const xml = new XMLHttpRequest();
      xml.addEventListener('load', _ => resolve(true));
      xml.addEventListener('error', reject);

      xml.open('POST', environment.feedbackWebhook, true);
      xml.send(JSON.stringify(payload));
    });
  }

}
