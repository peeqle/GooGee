import {Component, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialogRef: MatDialogRef<ModalService>, private dialog: MatDialog) {
  }

  openTemplateModal(template: any) {
    this.dialogRef = this.dialog.open(template, {
      height: '400px',
      width: '600px',
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
