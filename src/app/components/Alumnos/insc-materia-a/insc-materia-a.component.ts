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
  selector: 'app-insc-materia-a',
  templateUrl: './insc-materia-a.component.html',
  styleUrls: ['./insc-materia-a.component.scss']
})
export class InscMateriaAComponent implements OnInit {

  listadoMat!: Materia[];
  public materiaElejido: Materia | null = null;
  nombreMat: string = "";
  
  public usuario: any = null;

  constructor(public authSvc: AuthService, private _Uservice: UsuariosService, private _Mservice: MensajesService, private _MateService: MateriaService, private _Iservice: InscripcionMService) { }

  async ngOnInit() {
    this._MateService.traerTodos().subscribe((materia: Materia[]) => {
      this.listadoMat = materia;
    });

    var user = await this.authSvc.getCurrentUser();
    if (user?.email != null && user) {
      // console.log(user.email);
      var dataUser = await this._Uservice.getUsuarioPorEmail(user.email);
      //console.log(dataUser);
      this.usuario = dataUser;
    }
  }

  cargarMateriaSeleccionada(materia: Materia) {
    this.materiaElejido = materia;
    this.nombreMat = materia.nombre;
  }

  inscribir() {
    // console.log(this.usuario);
    var flagRegistrado = false;
    if (this.materiaElejido == null) {
      this._Mservice.mensajeError("Por favor seleccione una materia");
    }
    else {
      this._Iservice.getInscPorNombreMateria(this.materiaElejido.nombre).then(async (ins: InscripcionMateria) => {
        ins.listaAlumnos.forEach(alum => {
          if (alum.uid == this.usuario.uid) {
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
            ins.listaAlumnos.push(this.usuario);
            var idInsc = await this._Iservice.obtenerKey(ins);
            if (idInsc != null) {
              this._Iservice.updateInscripcion(idInsc, ins, "Inscripción realizada", "La inscripción no pudo ser completada");
            }
          }
        }
      });
    }
  }

}
