import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { observable, Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { EstadisticaJugador } from '../clases/estadistica-jugador';

import {
  AvisoDialogModel,
  CartelInformeComponent,
} from '../componentes/cartel-informe/cartel-informe.component';
import { JuegoServiceService } from './juego-service.service';

@Injectable()
export class AuthService {
  public title: string;
  public message: string;

  constructor(
    private auth: AngularFireAuth,
    private route: Router,
    public dialog: MatDialog
  ) {}

  login(email: string, pass: string): Promise<any> {
    return this.auth
      .signInWithEmailAndPassword(email, pass)
      .then((res) => {
        localStorage.setItem('isLogged', 'succes');
        localStorage.setItem('email', res.user.email);
        console.log('succes');
        this.route.navigate(['Juegos']);
      })
      .catch((err) => {
        if (err.code == 'auth/wrong-password') {
          this.message = 'Contraseña incorrecta';
        }

        return Promise.reject(this.message);
      });
  }

  register(email: string, pass: string, username: string): Promise<any> {
    return this.auth
      .createUserWithEmailAndPassword(email, pass)
      .then((res) => {
        localStorage.setItem('isLogged', 'succes');
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('username', username);

        return res;
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
            this.message = 'Ya existe otro usuario con el mail ingresado';
            break;
          case 'auth/invalid-email':
            this.message = 'El formato debe ser: xyx@midominio.com';

            break;
          case 'auth/weak-password':
            this.message = 'El password debe contener al menos 6 letras';
            break;
          default:
            this.message = err;
            break;
        }

        return Promise.reject(this.message);
      });
  }

  // public login(usuario: UsuarioDto): Observable<any> {
  //   return this.doPost<Object>(this.getContext() + '/api/Auth/Login', null, usuario)
  //     .pipe(
  //       tap(res => this.setSession(res)),
  //       catchError(error => {
  //         if (error.status === 404) {
  //           const message = this.traducciones['login.datosIncorrectos'];

  //           const dialogData = new AvisoDialogModel(this.traducciones['palabrasGenerales.error'], message);
  //           this.dialog.open(AvisoDialogComponent, {
  //             maxWidth: '400px',
  //             data: dialogData
  //           });
  //         }
  //         return of(false);
  //       }),
  //       shareReplay()
  //     );
  // }
}
