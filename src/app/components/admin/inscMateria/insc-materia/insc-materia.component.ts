import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../../../Models/Usuario';
import { Materia } from 'src/app/Models/Materia';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { InscripcionMateria } from 'src/app/Models/InscripcionMateria';
import { InscripcionMService } from 'src/app/services/inscripcion/inscripcion-m.service';

@Component({
  selector: 'app-insc-materia',
  templateUrl: './insc-materia.component.html',
  styleUrls: ['./insc-materia.component.scss']
})
export class InscMateriaComponent implements OnInit {

  listadoAlumn!: Usuario[];
  listadoMat!: Materia[];
  listadoInsc!: InscripcionMateria[];

  public alumnoElejido: Usuario | null = null;
  public materiaElejido: Materia | null = null;

  nombreAlum: string = "";
  nombreMat: string = "";

  constructor(private _Uservice: UsuariosService, private _Mservice: MensajesService, private _MateService: MateriaService, private _Iservice: InscripcionMService) { }

  ngOnInit(): void {
    this._Uservice.obtenerAlumnosAlta().subscribe(data => {
      this.listadoAlumn = data;
      // this.filtrarBaja();
    });

    this._MateService.traerTodos().subscribe((materia: Materia[]) => {
      this.listadoMat = materia;
    });

  }

  inscribir() {
    var flagRegistrado = false;
    if (this.alumnoElejido == null) {
      this._Mservice.mensajeError("Por favor seleccione un alumno");
    } else {
      if (this.materiaElejido == null) {
        this._Mservice.mensajeError("Por favor seleccione una materia");
      }
      else {
        this._Iservice.getInscPorNombreMateria(this.materiaElejido.nombre).then(async (ins: InscripcionMateria) => {
          ins.listaAlumnos.forEach(alum => {
            if (alum.uid == this.alumnoElejido.uid) {
              flagRegistrado = true;
            }
          });

          if (flagRegistrado) {
            this._Mservice.mensajeError("Este alumno ya esta inscripto");
          }
          else {
            if (ins.cupoAlumnos == ins.listaAlumnos.length.toString()) {
              this._Mservice.mensajeError("Lo sentimos la materia esta llena");
            }
            else {
              ins.listaAlumnos.push(this.alumnoElejido);
              var idInsc = await this._Iservice.obtenerKey(ins);
              if (idInsc != null) {
                this._Iservice.updateInscripcion(idInsc, ins, "Inscripci??n realizada", "La inscripci??n no pudo ser completada");
              }
            }
          }
        });
      }
    }
  }

  cargarAlumnoSeleccionado(usuario: Usuario) {
    this.alumnoElejido = usuario;
    this.nombreAlum = usuario.nombre;
  }

  cargarMateriaSeleccionada(materia: Materia) {
    this.materiaElejido = materia;
    this.nombreMat = materia.nombre;
  }

}
