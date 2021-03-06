import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { AdivinaElNumeroComponent } from '../componentes/adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from '../componentes/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { MenuComponent } from '../componentes/menu/menu.component';
import { AdivinaMasListadoComponent } from '../componentes/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from '../componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { PiedraPapelTijeraComponent } from '../componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { PiedraPapelTijeraMasListadoComponent } from '../componentes/piedra-papel-tijera-mas-listado/piedra-papel-tijera-mas-listado.component';
import { AhorcadoComponent } from '../componentes/ahorcado/ahorcado.component';
import { AhorcadoMasListadoComponent } from '../componentes/ahorcado-mas-listado/ahorcado-mas-listado.component';
// import { PiedraPapelTijeraMasListadoComponent } from '../componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from '../componentes/listado/listado.component';
import { ListadosComponent } from '../componentes/listados/listados.component';
import { JuegosComponent } from '../componentes/juegos/juegos.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { MenuCardComponent } from '../componentes/menu-card/menu-card.component';
import { CabeceraComponent } from '../componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component';
import { ListadoDePaisesComponent } from '../componentes/listado-de-paises/listado-de-paises.component';
import { MapaDeGoogleComponent } from '../componentes/mapa-de-google/mapa-de-google.component';
import { JugadoresListadoComponent } from '../componentes/jugadores-listado/jugadores-listado.component';
import { SalaPublicLayoutComponent } from '../layouts/sala-public-layout/sala-public-layout.component';
import { AnagramaMasListadoComponent } from '../componentes/anagrama-mas-listado/anagrama-mas-listado.component';
import { TatetiMasListadoComponent } from '../componentes/tateti-mas-listado/tateti-mas-listado.component';
import { EstadisticaTablaComponent } from '../componentes/estadistica-tabla/estadistica-tabla.component';
import { MemotestComponent } from '../componentes/memotest/memotest.component';
import { MemotestMasListadoComponent } from '../componentes/memotest-mas-listado/memotest-mas-listado.component';
// import { AnagramaMasListadoComponent } from '../componentes/anagrama-mas-listado/anagrama-mas-listado.component';
// import { TatetiMasListadoComponent } from '../componentes/tateti-mas-listado/tateti-mas-listado.component';
// import { PublicGuard, ProtectedGuard } from 'ngx-auth';

// declaro donde quiero que se dirija
const MiRuteo = [
  { path: '', redirectTo: 'Principal', pathMatch: 'full' },

  {
    path: 'Principal',
    component: PrincipalComponent,
    children: [
      { path: '', redirectTo: 'Login', pathMatch: 'full' },
      { path: 'QuienSoy', component: QuienSoyComponent },
      { path: 'Jugadores', component: JugadoresListadoComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'Mapa', component: MapaDeGoogleComponent },
      { path: 'Listado', component: ListadoComponent },
      { path: 'Paises', component: ListadoDePaisesComponent },
      { path: 'Registro', component: RegistroComponent },

      // {path: 'Juegos', component: JuegosComponent}
    ],
  },

  {
    path: 'Juegos',
    component: JuegosComponent,
    children: [
      { path: '', component: MenuCardComponent },
      { path: 'AdivinaMasListado', component: AdivinaMasListadoComponent },
      { path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent },
      { path: 'Agilidad', component: AgilidadAritmeticaComponent },
      { path: 'PiedraPapelTijera', component: PiedraPapelTijeraComponent },
      { path: 'PiedraPapelTijeraMasListado', component: PiedraPapelTijeraMasListadoComponent },
      { path: 'Ahorcado', component: AhorcadoComponent },
      { path: 'AhorcadoMasListado', component: AhorcadoMasListadoComponent },
      {
        path: 'PiedraPapelTijeraMasListado',
        component: PiedraPapelTijeraMasListadoComponent,
      },
      { path: 'Anagrama', component: AnagramaMasListadoComponent },
      { path: 'Tateti', component: TatetiMasListadoComponent },
      { path: 'Memotest', component: MemotestMasListadoComponent },
    ],
  },
  {
    path: 'Ranking',
    component: PrincipalComponent,
    children: [
      { path: 'Listado', component: ListadoComponent },
    ],
  },
  {
    path: 'Estadisticas',
    component: PrincipalComponent,
    children: [
      { path: '', component: EstadisticaTablaComponent },
    ],
  },
  { path: '**', component: ErrorComponent },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(MiRuteo)],
  exports: [RouterModule],
})
export class RuteandoModule {}
