import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Documento } from '../clases/documento';
import { Juego } from '../clases/juego';
import { JuegoAdivina } from '../clases/juego-adivina';
import { Jugador } from '../clases/jugador';
import { Ranking } from '../clases/Ranking';
import { MiHttpService } from './mi-http/mi-http.service';

@Injectable()
export class JuegoServiceService {
  constructor(private firestore: AngularFirestore) {}

  create_NewGame(juegos: any): Promise<DocumentReference> {
    return this.firestore.collection('juegos').add({ ...juegos });
  }

  read_AllGames(): Observable<Documento<Juego>[]> {
    return this.firestore
      .collection<Juego>('juegos')
      .snapshotChanges() //esto permite traer los datos como el id de firebase
      .pipe(
        map((results: DocumentChangeAction<Juego>[]) => {
          return results.map((result) => {
            var data = result.payload.doc.data();

            return {
              id: result.payload.doc.id,
              data: {
                nombre: data.nombre,
                jugador: data.jugador,
                gano: data.gano,
                fecha: data.fecha,
              } as Juego,
            };
          });
        })
      );
  }

  getRankingByGame(nombreJuego: string): Observable<Documento<Ranking>[]> {
    return this.firestore
    .collection<Ranking>('ranking', (ref) =>
      ref.where('nombre', '==', nombreJuego)
    )
    .snapshotChanges()
    .pipe(
      map((results: DocumentChangeAction<Ranking>[]) => {
        return results.map((result) => {
          var data = result.payload.doc.data();

          return {
            id: result.payload.doc.id,
            data: {
              nombre: data.nombre,
              jugador: data.jugador,
              puntaje: data.puntaje,
            } as Ranking,
          };
        });
      })
    );
  }

  read_AllGamesByEmailAndGameName(
    email: string,
    name: string
  ): Observable<Juego[]> {
    var juegos = this.firestore.collection<Juego>('juegos', (ref) =>
      ref
        .where('jugador', '==', email)
        .where('nombre', '==', name)
        .orderBy('fecha', 'desc')
    );

    return juegos.valueChanges();
  }

  create_Ranking(ranking: Ranking): Promise<DocumentReference> {
    return this.firestore.collection('ranking').add({ ...ranking });
  }

  create_Jugador(jugador: Jugador): Promise<DocumentReference> {
    return this.firestore.collection('jugadores').add({ ...jugador });
  }

  update_Jugador(doc: Documento<Jugador>) {
    this.firestore.doc('jugadores/' + doc.id).update(doc.data);
  }

  update_Ranking(doc: Documento<Ranking>) {
     this.firestore.doc('ranking/' + doc.id).update(doc.data);
  }

  update_Student(recordID, record) {
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
