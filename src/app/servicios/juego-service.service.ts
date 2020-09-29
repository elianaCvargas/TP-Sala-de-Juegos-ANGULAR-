import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Juego } from '../clases/juego';
import { JuegoAdivina } from '../clases/juego-adivina';
import { MiHttpService } from './mi-http/mi-http.service';

@Injectable()
export class JuegoServiceService {
  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewGame(juegos: Juego): Promise<DocumentReference> {
    return this.firestore.collection('juegos').add({...juegos});
  }

  read_Students() {
    return this.firestore.collection('Students').snapshotChanges();
  }

  update_Student(recordID,record){
    this.firestore.doc('Students/' + recordID).update(record);
  }

  delete_Student(record_id) {
    this.firestore.doc('Students/' + record_id).delete();
  }

  // peticion:any;
  // constructor( public miHttp: MiHttpService ) {
  //   this.peticion = this.miHttp.httpGetO("http://localhost:3003");

  // }

  // public listar(): Array<Juego> {
  //  this.miHttp.httpGetP("https://restcountries.eu/rest/v2/all")
  //   .then( data => {
  //     console.log( data );
  //   })
  //   .catch( err => {
  //     console.log( err );
  //   });


  //   this.peticion
  //   .subscribe( data => {
  //     console.log("En listar");
  //     console.log( data );
  //   }, err => {
  //     console.info("error: " ,err );
  //   })

  //   let miArray: Array<Juego> = new Array<Juego>();

  //   miArray.push(new JuegoAdivina("Juego 1", false));
  //   miArray.push(new JuegoAdivina("Pepe", true));
  //   miArray.push(new JuegoAdivina("Juego 3", false));
  //   miArray.push(new JuegoAdivina("Juego 4", false));
  //   miArray.push(new JuegoAdivina("Juego 5", false));
  //   miArray.push(new JuegoAdivina("Juego 6", false));
  //   return miArray;
  // }

  // public listarPromesa(): Promise<Array<Juego>> {
  //   this.peticion
  //   .subscribe( data => {
  //     console.log("En listarPromesa");
  //     console.log( data );
  //   }, err => {
  //     console.log( err );
  //   })
  //   let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) => {
  //     let miArray: Array<Juego> = new Array<Juego>();
  //     miArray.push(new JuegoAdivina("JuegoPromesa 1", false,"promesa"));
  //     miArray.push(new JuegoAdivina("PepePromesa", true));
  //     miArray.push(new JuegoAdivina("JuegoPromesa 3", false));
  //     miArray.push(new JuegoAdivina("JuegoPromesa 4", false));
  //     miArray.push(new JuegoAdivina("JuegoPromesa 5", false));
  //     miArray.push(new JuegoAdivina("JuegoPromesa 6", false));
  //     resolve(miArray);
  //   });

  //   return promesa;
  // }

}
