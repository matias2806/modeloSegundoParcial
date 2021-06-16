import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { map, finalize } from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
import { Usuario } from '../../Models/Usuario';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MensajesService } from '../mensajes/mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  public usuarioAuxiliarSoloAlta : Usuario;
  private filePath: any;

  public usuario: any = {};
  // private dowloadURL: Observable<string>;

  private path = '/usuarios';
  usuariosColecction: AngularFirestoreCollection<Usuario>;
  public usuarios: Observable<Usuario[]>;


  constructor(public db: AngularFirestore, private storage: AngularFireStorage, private AuthSvc: AuthService, private _Mservice: MensajesService) {
    this.usuariosColecction = db.collection(this.path);

    this.usuarios = this.usuariosColecction.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        // console.log(a);
        const data = a.payload.doc.data() as unknown as Usuario;
        //data.auxId = a.payload.doc.id;
        return data;
      });
    }));
  }

  altaUsuario(usuario: Usuario) {
    console.log("Alta exitosa");
    return this.usuariosColecction.add(JSON.parse(JSON.stringify(usuario)));
  }

  traerTodos() {
    return this.usuarios;
  }

  public getUsuarioPorEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.path).get().subscribe((querySnapshot) => {
        let doc = querySnapshot.docs.find(doc => (doc.data() as Usuario).email == email);
        resolve(doc?.data());
      })
    });
  }

  public getUsuarioPorTipoPerfil(tipoPerfil: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.path).get().subscribe((querySnapshot) => {
        let doc = querySnapshot.docs.find(doc => (doc.data() as Usuario).tipoPerfil == tipoPerfil);
        resolve(doc?.data());
      })
    });
  }

  obtenerProfesores() {
    return this.usuarios.pipe(map(dato => {
      return dato.filter(f => {
        return f.tipoPerfil == "Profesor";
      });
    }));
  }

  obtenerAlumnos() {
    return this.usuarios.pipe(map(dato => {
      return dato.filter(f => {
        return f.tipoPerfil == "Alumno";
      });
    }));
  }



  async obtenerKeyUsuario(user: Usuario) {
    var aux = await this.db.collection(this.path).ref.where('email', '==', user.email).get();
    if (aux.docs[0].exists) {
      return aux.docs[0].id;
    }
    else {
      return null;
    }
  }


  delete(id: string): Promise<void> {
    return this.usuariosColecction.doc(id).delete();
  }


  preGuardarUsuario(user: Usuario, image: any): void {
    if (image) {
      this.usuarioAuxiliarSoloAlta = user;
      this.subirImagenConUid(user, image);

      console.log(" this.usuarioAuxiliarSoloAlta", this.usuarioAuxiliarSoloAlta);
      setTimeout(() => {
        this.altaUsuario( this.usuarioAuxiliarSoloAlta);
      }, 2000);
    }
  }


  subirImagenConUid(user: Usuario, imagen: any) {
    this.filePath = `images/${user.uid}/${imagen.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        console.log("Pruebaaa => " + urlImagen)
        this.usuarioAuxiliarSoloAlta.URLfoto = urlImagen
      })
    })).subscribe();
  }


  updateUsuarioEstado(id: any, usuario: Usuario, mensajeExitoso: string, mensajeFallo: string) {
    var user = this.db.collection(this.path).doc(id);

    return user.update({
      estado: usuario.estado,
      fechaBaja: usuario.fechaBaja
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

}
