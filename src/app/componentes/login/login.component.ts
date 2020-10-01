import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username;
  public password;
  userGroup: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {

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


  onSubmit()
  {
    this.username = this.userGroup.get('username').value;
    this.password =  this.userGroup.get('password').value;
    this.authService.login(this.username, this.password)

  }

  registrarse()
  {}
  recuperarContra()
  {}
}
