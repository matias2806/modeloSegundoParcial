import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MensajesService } from '../mensajes/mensajes.service';
import { map, finalize } from 'rxjs/operators';
import { Materia } from 'src/app/Models/Materia';
import { InscripcionMateria } from 'src/app/Models/InscripcionMateria';

@Injectable({
  providedIn: 'root'
})
export class InscripcionMService {
  private path = '/inscripcion';
  
  inscripcionColecction: AngularFirestoreCollection<InscripcionMateria>;
  public inscripcion: Observable<InscripcionMateria[]>;

  
  constructor(public db: AngularFirestore, private storage: AngularFireStorage, private AuthSvc: AuthService, private _Mservice: MensajesService) {
    this.inscripcionColecction = db.collection(this.path);

    this.inscripcion = this.inscripcionColecction.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        // console.log(a);
        const data = a.payload.doc.data() as unknown as InscripcionMateria;
        //data.auxId = a.payload.doc.id;
        return data;
      });
    }));
  }

  alta(inscripcion: InscripcionMateria) {
    console.log("Alta exitosa");
    return this.inscripcionColecction.add(JSON.parse(JSON.stringify(inscripcion)));
  }

  traerTodos() {
    return this.inscripcion;
  }

  public getInscPorNombreMateria(nombre: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.path).get().subscribe((querySnapshot) => {
        let doc = querySnapshot.docs.find(doc => (doc.data() as InscripcionMateria).nombre == nombre);
        resolve(doc?.data());
      })
    });
  }

  async obtenerKey(inscripcion: InscripcionMateria) {
    var aux = await this.db.collection(this.path).ref.where('id', '==', inscripcion.id).get();
    if (aux.docs[0].exists) {
      return aux.docs[0].id;
    }
    else {
      return null;
    }
  }

  updateInscripcion(id: any, inscripcion: InscripcionMateria, mensajeExitoso: string, mensajeFallo: string) {
    var tur = this.db.collection(this.path).doc(id);

    return tur.update({
      listaAlumnos: inscripcion.listaAlumnos
    })
      .then(() => {
        console.log("Documento actualizado!");
        this._Mservice.mensajeExitoso(mensajeExitoso);
      })
      .catch((error) => {
        console.error("Error en la actualizacion: ", error);
        this._Mservice.mensajeExitoso(mensajeFallo);
      });
  }


  updateRapido(id: any, ins: InscripcionMateria) {
    var user = this.db.collection(this.path).doc(id);

    return user.update({
      listaAlumnos: ins.listaAlumnos
    })
      .then(() => {
        console.log("Documento actualizado!");
      })
      .catch((error) => {
        console.error("Error en la actualizacion: ", error);
      });
  }
}
