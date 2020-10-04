import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AvisoDialogModel, CartelInformeComponent } from '../cartel-informe/cartel-informe.component';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  public username;
  userGroup: FormGroup;
  public isRegistered: boolean = false;

  ngOnInit() {}

  constructor(
    public dialogRef: MatDialogRef<RegistroComponent>,
    public dialog: MatDialog,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public builder: FormBuilder, private route: Router
  ) {
    this.userGroup = this.builder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password1: [null, [Validators.required, Validators.minLength(6)]],
      password2: [
        null,
        [
          Validators.required, this.passwordMatcher1.bind(this),
          Validators.minLength(6)
        ],
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.isRegistered = true;
    this.authService
      .register(
        this.userGroup.controls.email.value,
        this.userGroup.controls.password1.value,
        this.userGroup.controls.username.value
      ).then((res) => {
        const dialogData = new AvisoDialogModel("Mensaje", "Se ha registrado con exito!");
        const dialog = this.dialog.open(CartelInformeComponent, {
          maxWidth: '400px',
          data: dialogData,
        });

        dialog.afterClosed().subscribe((data: any) => {
          this.route.navigate(['/Juegos']);
          this.dialogRef.close();
        });
      })
      .catch((error) => {
        const dialogData = new AvisoDialogModel('Ha ocurrido un problema!', error);
        this.dialog.open(CartelInformeComponent, {
          maxWidth: '400px',
          data: dialogData,
        });
      });
  }

  private passwordMatcher1(control: FormControl): { [s: string]: boolean } {
    if (
      this.userGroup &&
      control.value !== this.userGroup.controls.password1.value
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

  get email(): AbstractControl {
    return this.userGroup.controls['email'];
  }

  get usernameControl(): AbstractControl {
    return this.userGroup.controls['username'];
  }

  onPasswordChange() {
    if (
      this.userGroup.controls.password1.value ===
      this.userGroup.controls.password2.value
    ) {
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
