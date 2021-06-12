import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MensajesService } from '../mensajes/mensajes.service';
import { map, finalize } from 'rxjs/operators';
import { Materia } from 'src/app/Models/Materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private path = '/materias';
  
  materiasColecction: AngularFirestoreCollection<Materia>;
  public materias: Observable<Materia[]>;

  
  constructor(public db: AngularFirestore, private storage: AngularFireStorage, private AuthSvc: AuthService, private _Mservice: MensajesService) {
    this.materiasColecction = db.collection(this.path);

    this.materias = this.materiasColecction.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        // console.log(a);
        const data = a.payload.doc.data() as unknown as Materia;
        //data.auxId = a.payload.doc.id;
        return data;
      });
    }));
  }

  alta(materia: Materia) {
    console.log("Alta exitosa");
    return this.materiasColecction.add(JSON.parse(JSON.stringify(materia)));
  }

  traerTodos() {
    return this.materias;
  }
}
