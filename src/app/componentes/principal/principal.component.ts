import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  constructor() {  }

  ngOnInit() {
  }
  hayQueVerInfoAlLoggearse;
  contrasena;
  usuario;
  logIn()
  {}
  registrarse()
  {}
  recuperarContra()
  {}


}
