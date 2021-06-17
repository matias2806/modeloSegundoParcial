import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MensajesService } from '../mensajes/mensajes.service';
import { map, finalize } from 'rxjs/operators';
import { Materia } from 'src/app/Models/Materia';
import { InscripcionMateria } from 'src/app/Models/InscripcionMateria';
import { Examen } from 'src/app/Models/Examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private path = '/examen';

  examenColecction: AngularFirestoreCollection<Examen>;
  public examen: Observable<Examen[]>;

  constructor(public db: AngularFirestore, private storage: AngularFireStorage, private AuthSvc: AuthService, private _Mservice: MensajesService) {
    this.examenColecction = db.collection(this.path);

    this.examen = this.examenColecction.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        // console.log(a);
        const data = a.payload.doc.data() as unknown as Examen;
        //data.auxId = a.payload.doc.id;
        return data;
      });
    }));
  }

  alta(examen: Examen) {
    console.log("Alta exitosa");
    return this.examenColecction.add(JSON.parse(JSON.stringify(examen)));
  }

  traerTodos() {
    return this.examen;
  }

  obtenerExamenesAprobacionDirecta(materia: Materia) {
    return this.examen.pipe(map(dato => {
      return dato.filter(e => {
        return (e.materia.id == materia.id && e.nota >= 7);
      });
    }));
  }

  obtenerExamenesAprobadosODesaprobados(materia: Materia) {
    return this.examen.pipe(map(dato => {
      return dato.filter(e => {
        return (e.materia.id == materia.id && e.nota < 7);
      });
    }));
  }
}
