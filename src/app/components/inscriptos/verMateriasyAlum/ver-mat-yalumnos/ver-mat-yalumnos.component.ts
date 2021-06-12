import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../../../Models/Usuario';
import { AuthService } from '../../../../auth/service/auth.service';
import { Materia } from 'src/app/Models/Materia';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { InscripcionMateria } from 'src/app/Models/InscripcionMateria';
import { InscripcionMService } from 'src/app/services/inscripcion/inscripcion-m.service';
@Component({
  selector: 'app-ver-mat-yalumnos',
  templateUrl: './ver-mat-yalumnos.component.html',
  styleUrls: ['./ver-mat-yalumnos.component.scss']
})
export class VerMatYalumnosComponent implements OnInit {

  listadoMat!: Materia[];
  listadoAlumn!: Usuario[];

  public materiaElejido: Materia | null = null;

  nombreMat: string = "";

  constructor(private router: Router, private _Uservice: UsuariosService, private _Mservice: MensajesService, private _MateService: MateriaService, private _Iservice: InscripcionMService) { }

  ngOnInit(): void {
    this._MateService.traerTodos().subscribe((materia: Materia[]) => {
      this.listadoMat = materia;
    });
  }

  cargarAlumnoSeleccionado(usuario: Usuario) {
    // this.alumnoElejido = usuario;
    // this.nombreAlum = usuario.nombre;
  }

  cargarMateriaSeleccionada(materia: Materia) {
    this.materiaElejido = materia;
    this.nombreMat = materia.nombre;
    this.cargarAlumnos()
  }

  cargarAlumnos(){
    this._Iservice.getInscPorNombreMateria(this.materiaElejido.nombre).then(async (ins: InscripcionMateria) => {
      this.listadoAlumn = ins.listaAlumnos;
    });
  }

}
