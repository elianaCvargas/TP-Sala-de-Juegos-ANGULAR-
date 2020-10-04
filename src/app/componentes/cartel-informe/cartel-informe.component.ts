import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cartel-informe',
  templateUrl: './cartel-informe.component.html',
  styleUrls: ['./cartel-informe.component.scss']
})
export class CartelInformeComponent implements OnInit {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<CartelInformeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AvisoDialogModel) {

    this.title = data.title;
    this.message = data.message;
  }


  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onConfirm(data?: any): void {
    console.log('onConfirm ' + this.dialogRef);
    this.dialogRef.close(data);
  }
}

export class AvisoDialogModel {
  constructor(public title: string, public message: string) { }
}
