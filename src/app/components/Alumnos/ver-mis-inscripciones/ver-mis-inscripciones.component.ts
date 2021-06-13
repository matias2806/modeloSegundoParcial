import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../../Models/Usuario';
import { Materia } from 'src/app/Models/Materia';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { InscripcionMateria } from 'src/app/Models/InscripcionMateria';
import { InscripcionMService } from 'src/app/services/inscripcion/inscripcion-m.service';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-ver-mis-inscripciones',
  templateUrl: './ver-mis-inscripciones.component.html',
  styleUrls: ['./ver-mis-inscripciones.component.scss']
})
export class VerMisInscripcionesComponent implements OnInit {

  listadoMat!: Materia[];
  listadoIns!: InscripcionMateria[];

  public usuario: any = null;

  constructor(public authSvc: AuthService, private _Uservice: UsuariosService, private _Mservice: MensajesService, private _MateService: MateriaService, private _Iservice: InscripcionMService) { }

  async ngOnInit() {
    this._Iservice.traerTodos().subscribe((ins: InscripcionMateria[]) => {
      this.listadoIns = ins;
    });

    var user = await this.authSvc.getCurrentUser();
    if (user?.email != null && user) {
      // console.log(user.email);
      var dataUser = await this._Uservice.getUsuarioPorEmail(user.email);
      //console.log(dataUser);
      this.usuario = dataUser;
      this.filtrarInscripciones();
    }

  }

  filtrarInscripciones() {
    // console.log(this.usuario);
    var aux = [];
    var flag = false;
    this.listadoIns.forEach(ins => {
      ins.listaAlumnos.forEach(alum => {
        if (alum.uid == this.usuario.uid) {
          flag = true;
        }
      });

      if(!flag){
        aux.push(ins);
      }
      flag=false;
    });
    // console.log(aux);

    if(aux.length > 0){
      for (let i = 0; i < aux.length; i++) {
        this.listadoIns.splice(this.listadoIns.indexOf(aux[i]), 1);
      }
    }
    // console.log(this.listadoIns);
  }

  cargarMateriaSeleccionada(materia: Materia) {
  }

  cargarInscripcionSeleccionada(insc: InscripcionMateria) {

  }


}
