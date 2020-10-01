import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  userIsLogged: boolean;
  constructor(private route: Router) { }

  ngOnInit() {
    this.userIsLogged = localStorage.getItem("isLogged") != undefined ? true : false;
  }

  logout() {
    this.userIsLogged = false;
    localStorage.removeItem("isLogged");
    this.route.navigate(['/Juegos']);
  }
}
