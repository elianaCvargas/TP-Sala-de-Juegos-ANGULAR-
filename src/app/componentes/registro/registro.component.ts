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
import { Observable, forkJoin } from 'rxjs';
import { EstadisticaJugador } from 'src/app/clases/estadistica-jugador';
import { Ranking } from 'src/app/clases/Ranking';
import { JuegosEnum } from 'src/app/enum/juegosEnum';
import { AuthService } from 'src/app/servicios/auth.service';
import { JuegoServiceService } from 'src/app/servicios/juego-service.service';
import { AvisoDialogModel, CartelInformeComponent } from '../cartel-informe/cartel-informe.component';
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
    public builder: FormBuilder, private route: Router,
    private juegoService: JuegoServiceService
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

        const estadisticaAdivina = new EstadisticaJugador(JuegosEnum.Adivina, this.email.value, 0, 0);
        const estadisticaAnagrama = new EstadisticaJugador(JuegosEnum.Anagrama, this.email.value, 0, 0);
        const estadisticaAgilidad = new EstadisticaJugador(JuegosEnum.Agilidad, this.email.value, 0, 0);
        const estadisticaPiedra = new EstadisticaJugador(JuegosEnum.Piedra, this.email.value, 0, 0);
        const estadisticaTateti = new EstadisticaJugador(JuegosEnum.Tateti, this.email.value, 0, 0);
        const estadisticaAhorcado = new EstadisticaJugador(JuegosEnum.Ahorcado, this.email.value, 0, 0);
        const rankingAdivina = new Ranking(JuegosEnum.Adivina, this.email.value, 0 );
        const rankingAnagrama = new Ranking(JuegosEnum.Anagrama, this.email.value, 0 );
        const rankingPiedra = new Ranking(JuegosEnum.Piedra, this.email.value, 0 );
        const rankingAgilidad = new Ranking(JuegosEnum.Agilidad, this.email.value, 0 );
        const rankingTateti = new Ranking(JuegosEnum.Tateti, this.email.value, 0 );
        const rankingAhorcado = new Ranking(JuegosEnum.Ahorcado, this.email.value, 0 );
        //forkjoin ejecuta todas las consultas de la lista ([..]) ,
        //una vez que terminan de resolverse TODAS, recien entran o por el succes, o error.
        forkJoin(
          [
            this.juegoService.create_Ranking(rankingAdivina),
            this.juegoService.create_Ranking(rankingAnagrama),
            this.juegoService.create_Ranking(rankingPiedra),
            this.juegoService.create_Ranking(rankingAgilidad),
            this.juegoService.create_Ranking(rankingTateti),
            this.juegoService.create_Ranking(rankingAhorcado),
            this.juegoService.create_Jugador(estadisticaAdivina),
            this.juegoService.create_Jugador(estadisticaAnagrama),
            this.juegoService.create_Jugador(estadisticaPiedra),
            this.juegoService.create_Jugador(estadisticaAgilidad),
            this.juegoService.create_Jugador(estadisticaTateti),
            this.juegoService.create_Jugador(estadisticaAhorcado),
          ]
        )
        .subscribe(() => {
          const dialogData = new AvisoDialogModel("Mensaje", "Se ha registrado con exito!");
          const dialog = this.dialog.open(CartelInformeComponent, {
            maxWidth: '400px',
            data: dialogData,
          });
          dialog.afterClosed().subscribe((data: any) => {
            this.route.navigate(['/Juegos']);
            this.dialogRef.close();
          });
        },
        (error) => {
          const dialogData = new AvisoDialogModel('Ha ocurrido un problema!', error);
          this.dialog.open(CartelInformeComponent, {
            maxWidth: '400px',
            data: dialogData,
          });
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
