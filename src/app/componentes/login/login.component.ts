import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
import { AuthService } from 'src/app/servicios/auth.service';
import { AvisoDialogModel, CartelInformeComponent } from '../cartel-informe/cartel-informe.component';
import { RegistroComponent } from '../registro/registro.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username;
  public password;
  animal;
  userGroup: FormGroup;

  constructor(private route: Router, private router: Router, private authService: AuthService
    ,private dialog: MatDialog) {

  }

  ngOnInit() {
    this.userGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      // passwordRepeat: new FormControl('')
    });
  }

  // Entrar() {
  //   if (this.username === 'admin' && this.password === 'admin') {
  //     this.router.navigate(['/Principal']);
  //   }
  // }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegistroComponent, {
      width: '500px',
      data: {name: this.username, animal: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(localStorage.getItem("isLogged") != undefined)
      {
        this.route.navigate(['Juegos']);
      }
    });
  }

  onSubmit()
  {
    this.username = this.userGroup.get('username').value;
    this.password =  this.userGroup.get('password').value;
    this.authService.login(this.username, this.password).then((succes) => {

    }).catch((error) => {
      const dialogData = new AvisoDialogModel('Ha ocurrido un problema!', error);
        this.dialog.open(CartelInformeComponent, {
          maxWidth: '400px',
          data: dialogData,
        });
    });

  }

  registrarse()
  {}
  recuperarContra()
  {}
}
