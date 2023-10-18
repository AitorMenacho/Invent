import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-accepted',
  templateUrl: './modal-accepted.component.html',
  styleUrls: ['./modal-accepted.component.scss'],
})
export class ModalAcceptedComponent {
  title: string = '';
  message: string = '';
  icon: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalAcceptedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
    this.icon = data.icon;
  }

  close() {
    this.dialogRef.close();
  }
}
