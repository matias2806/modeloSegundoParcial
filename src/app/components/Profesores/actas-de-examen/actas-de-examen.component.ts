import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../../Models/Usuario';
import { Materia } from 'src/app/Models/Materia';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { InscripcionMateria } from 'src/app/Models/InscripcionMateria';
import { InscripcionMService } from 'src/app/services/inscripcion/inscripcion-m.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ExamenService } from 'src/app/services/examen/examen.service';
import { Examen } from 'src/app/Models/Examen';

@Component({
  selector: 'app-actas-de-examen',
  templateUrl: './actas-de-examen.component.html',
  styleUrls: ['./actas-de-examen.component.scss']
})
export class ActasDeExamenComponent implements OnInit {

  listadoMat: Materia[] = [];
  listadoExamenesPromocion: Examen[] = [];
  listadoExamenesNoPromocion: Examen[] = [];


  materiaElejida: Materia;

  public usuario: any = null;

  constructor(public authSvc: AuthService, private _Uservice: UsuariosService, private _Eservice: ExamenService, private _Mservice: MensajesService, private _MateService: MateriaService, private _Iservice: InscripcionMService) { }

  async ngOnInit() {
    var user = await this.authSvc.getCurrentUser();
    if (user?.email != null && user) {
      // console.log(user.email);
      var dataUser = await this._Uservice.getUsuarioPorEmail(user.email);
      //console.log(dataUser);
      this.usuario = dataUser;
    }

    this._MateService.traerTodos().subscribe((materia: Materia[]) => {
      this.listadoMat = materia;
      this.filtrarListadoMaterias();
    });
  }

  filtrarListadoMaterias(){
    var aux = [];
    this.listadoMat.forEach(mat => {
      if(mat.profesor.uid != this.usuario.uid){
        aux.push(mat);
      }
    });
    if(aux.length > 0){
      for (let i = 0; i < aux.length; i++) {
        this.listadoMat.splice(this.listadoMat.indexOf(aux[i]), 1);
      }
    }
  }



  cargarMateriaSeleccionada(materia: Materia) {
    this.materiaElejida = materia;
    this.cargarExamenes();
  }

  cargarExamenes(){
    // cargarExamenes

    this._Eservice.obtenerExamenesAprobacionDirecta(this.materiaElejida).subscribe(data=>{
      this.listadoExamenesPromocion = data;
    });

    this._Eservice.obtenerExamenesAprobadosODesaprobados(this.materiaElejida).subscribe(data=>{
      this.listadoExamenesNoPromocion = data;
    });

  }

  cargarExamenSeleccionado($event){ }
  cargarExamenSeleccionado2($event){}
}
