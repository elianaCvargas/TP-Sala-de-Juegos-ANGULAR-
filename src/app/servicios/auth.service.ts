import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private auth: AngularFireAuth, private route: Router) {}
datodevuelto;
  login(email: string, pass: string)
  {
    this.auth.signInWithEmailAndPassword(email, pass)
    .then( res => {
      localStorage.setItem("isLogged", "succes");
      localStorage.setItem("username", res.user.email);

      console.log("succes");
      //por ahora hare el routing desde aca,  la idea es modificar esto
      this.route.navigate(['Juegos']);
    }).catch(err => { console.log(err)});
  }
}
