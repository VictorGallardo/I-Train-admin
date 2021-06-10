import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  data: any = {};

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) { }


  openSnackBar(msg: string, action: string) {
    this.snackbar.open(msg, action, {

      duration: 5000,
      verticalPosition: this.verticalPosition,
      // horizontalPosition: this.horizontalPosition
    });
  }

  deleteRecordDialog(

    id: string,
    msg: string,
    option: string,
    dialogComponent: ComponentType<unknown>

  ) {

    const dialogRef = this.dialog.open(dialogComponent, {
      data: {
        id: id,
        msg: msg,
        option: option
      }
    });

    return dialogRef;

  }
}
