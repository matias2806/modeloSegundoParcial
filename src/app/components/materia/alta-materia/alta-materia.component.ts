import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../../Models/Usuario';
import { AuthService } from '../../../auth/service/auth.service';
import { Materia } from 'src/app/Models/Materia';
import { v4 as uuidv4 } from 'uuid';
import { MateriaService } from 'src/app/services/materia/materia.service';

@Component({
  selector: 'app-alta-materia',
  templateUrl: './alta-materia.component.html',
  styleUrls: ['./alta-materia.component.scss']
})
export class AltaMateriaComponent implements OnInit {

  listadoProf!: Usuario[];
  public registerForm: FormGroup | undefined;
  public cuatri = "1"

  public banderaProfesorElejido = true;
  public profesor: Usuario | null = null;

  constructor(private fb: FormBuilder, private AuthSvc: AuthService, private router: Router, private _Uservice: UsuariosService, private _Mservice: MensajesService, private _MateService: MateriaService) { }

  ngOnInit(): void {
    this._Uservice.obtenerProfesores().subscribe(data => {
      this.listadoProf = data;
    });

    this.registerForm = this.fb.group({
      'nombre': ['', [Validators.required]],//Obli
      'cuatrimestre': ['', [Validators.required]],//Obli
      'cupoAlumnos': ['', [Validators.required, Validators.min(10), Validators.max(600)]],//Obli
      'anio': ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],//Obli
      'profesor': ['', [Validators.required]]
    });
  }


  cargarProfesorSeleccionado(usuario: Usuario) {
    this.banderaProfesorElejido = false;
    this.profesor = usuario;
    this.registerForm?.controls['profesor'].setValue( this.profesor);
  }

  eliminarProfesor(profesor: Usuario) {
    this.banderaProfesorElejido = true;
    this.profesor = null;
    this.registerForm?.controls['profesor'].setValue("");
  }

  async onRegister() {
    console.log(this.registerForm);
    let materia: Materia = {
      id: uuidv4(),
      nombre: this.registerForm?.controls['nombre'].value,
      cuatrimestre: this.registerForm?.controls['cuatrimestre'].value,
      cupoAlumnos: this.registerForm?.controls['cupoAlumnos'].value,
      anio: this.registerForm?.controls['anio'].value,
      profesor: this.registerForm?.controls['profesor'].value,
    }
    console.log(materia);
    this._MateService.alta(materia);
    this._Mservice.mensajeExitoso("Materia dada de alta");
    this.router.navigate(['/home']);
  }
}
