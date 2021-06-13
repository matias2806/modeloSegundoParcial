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
  selector: 'app-listado-alumnos-por-materias',
  templateUrl: './listado-alumnos-por-materias.component.html',
  styleUrls: ['./listado-alumnos-por-materias.component.scss']
})
export class ListadoAlumnosPorMateriasComponent implements OnInit {

  listadoMat: Materia[] = [];
  listadoAlumn: Usuario[] = [];
  listadoIns!: InscripcionMateria[];

  materiaElejida: Materia

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
    var aux = [];

    // console.log(this.listadoIns);
    this.listadoIns.forEach(ins => {
      if (ins.materia.profesor.uid != this.usuario.uid) {
        aux.push(ins);
      }
    });

    if (aux.length > 0) {
      for (let i = 0; i < aux.length; i++) {
        this.listadoIns.splice(this.listadoIns.indexOf(aux[i]), 1);
      }
    }

    // console.log(this.listadoIns);
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.listadoIns.forEach(ins => {
      this.listadoMat.push(ins.materia);
    });
  }

  cargarAlumnoSeleccionado(alumno: Usuario) { }

  cargarMateriaSeleccionada(materia: Materia) {
    this.listadoAlumn = [];
    // console.log(materia);
    this.materiaElejida = materia;
    this.listarAlumnos();
  }

  listarAlumnos() {
    // console.log(this.listadoIns);
    this.listadoIns.forEach(ins => {
      if (ins.materia.id == this.materiaElejida.id) {
        ins.listaAlumnos.forEach(alum => {
          this.listadoAlumn.push(alum);
        });
      }
    });
  }
}
