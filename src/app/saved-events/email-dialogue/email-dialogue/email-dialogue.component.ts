import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { emailRegex } from './emailRegex';

const commaSeparatedEmails = (control: AbstractControl): { [key: string]: any } | null => {
  let valid = true;
  const emails = control.value.replace(/\s/g, '').split(',');
  for (const email of emails) {
    if (!emailRegex.test(email)) {
      valid = false;
    }
  }
  return valid ? null : { 'malformedEmail': { value: control.value } };
};

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialogue.component.html',
  styleUrls: ['./email-dialogue.component.scss']
})
export class EmailDialogueComponent {

  public emailForm = this.fb.group({
    senderName: ['', Validators.required],
    recipients: ['', commaSeparatedEmails],
  });

  constructor(public dialogRef: MatDialogRef<EmailDialogueComponent>, private fb: FormBuilder) { }

  public cancel() {
    this.dialogRef.close();
  }

  public email() {
    if (!this.emailForm.valid) {
      return;
    }

    this.dialogRef.close({
      senderName: this.emailForm.controls.senderName.value,
      recipients: this.emailForm.controls.recipients.value.replace(/\s/g, '').split(',')
    });
  }

}
