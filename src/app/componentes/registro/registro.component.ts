import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public username;
  userGroup: FormGroup;
 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/

  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<RegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,  public builder: FormBuilder) {
      this.userGroup = this.builder.group({
        username: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password1: [null, Validators.required],
        password2: [null, [Validators.required, this.passwordMatcher1.bind(this)]],
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){}

  private passwordMatcher1(control: FormControl): { [s: string]: boolean } {
    if (
      this.userGroup &&
      (control.value !== this.userGroup.controls.password1.value)
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  get password1(): AbstractControl {
    return this.userGroup.controls['password1'];
  }

  get password2(): AbstractControl {
    return this.userGroup.controls['password2'];
  }

  onPasswordChange() {
    if (this.userGroup.controls.password1.value === this.userGroup.controls.password2.value) {
      this.password2.setErrors(null);
    } else {
      this.password2.setErrors({ passwordNotMatch: true });
    }
  }

}
export interface DialogData {
  username: string;
  password: string;
}
