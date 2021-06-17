import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../Models/Usuario';
import { Materia } from 'src/app/Models/Materia';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { InscripcionMateria } from 'src/app/Models/InscripcionMateria';
import { InscripcionMService } from 'src/app/services/inscripcion/inscripcion-m.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Examen } from 'src/app/Models/Examen';
import { v4 as uuidv4 } from 'uuid';
import { ExamenService } from 'src/app/services/examen/examen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargar-examen',
  templateUrl: './cargar-examen.component.html',
  styleUrls: ['./cargar-examen.component.scss']
})
export class CargarExamenComponent implements OnInit {

  listadoMat: Materia[] = [];
  listadoAlumn: Usuario[] = [];
  listadoIns!: InscripcionMateria[];

  materiaElejida: Materia = null;
  alumnoElejido: Usuario = null;
  inscripcionElejida: InscripcionMateria = null;

  public usuario: any = null;

  public registerForm: FormGroup | undefined;
  constructor(private fb: FormBuilder, public authSvc: AuthService, private router: Router, private _Uservice: UsuariosService, private _Mservice: MensajesService, private _MateService: MateriaService, private _Iservice: InscripcionMService, private _Eservice: ExamenService) {
    this.registerForm = this.fb.group({
      'nota': ['', [Validators.required, Validators.min(1), Validators.max(10)]],//Obli
      'fecha': ['', [Validators.required]],//Obli
    });

  }

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

  cargarMateriaSeleccionada(materia: Materia) {
    this.listadoAlumn = [];
    // console.log(materia);
    this.materiaElejida = materia;
    this.listarAlumnos();

    this._Iservice.getInscPorNombreMateria(this.materiaElejida.nombre).then(async (ins: InscripcionMateria) => {
      this.inscripcionElejida = ins;
    });
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

  cargarAlumnoSeleccionado(alumno: Usuario) {
    console.log("Entro");
    this.alumnoElejido = alumno;
  }

  async onRegister() {


    if (this.materiaElejida != null) {
      console.log(this.materiaElejida.nombre)
      if (this.alumnoElejido != null) {
        if (this.registerForm?.controls['nota'].value != null && this.registerForm?.controls['fecha'].value != null) {//form
          try {
            let examen: Examen = {
              id: uuidv4(),
              nota: this.registerForm?.controls['nota'].value,
              fecha: this.registerForm?.controls['fecha'].value,
              materia: this.materiaElejida,
              profesor: this.usuario,
              alumno: this.alumnoElejido,
              inscripcion: this.inscripcionElejida,
            }
            console.log(examen);
            this._Eservice.alta(examen);
            this._Mservice.mensajeExitoso("Examen registrado");
            this.router.navigate(['/home']);

          } catch (error) {
            console.log(error);
          }
        }
        else {
          this._Mservice.mensajeError("Por favor elije una alumno");
        }
      }
      else {
        this._Mservice.mensajeError("Por favor elije una alumno");
      }
    }
    else {
      this._Mservice.mensajeError("Por favor elije una materia");
    }

  }


}
