import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from "@angular/router";

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../dialog/dialog.component.html',
  styleUrls: ['../dialog/dialog.component.scss']

})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  navigate(url: any) {
    window.open(url)
  }
  refresh() {
    location.href = '/content';
  }
}