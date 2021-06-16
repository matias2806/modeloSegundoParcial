import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../../../Models/Usuario';
import { FiltroUsuariosPipe } from '../../../../pipes/filtro-usuarios.pipe';
import { Router } from '@angular/router';
import { InscripcionMateria } from 'src/app/Models/InscripcionMateria';
import { InscripcionMService } from 'src/app/services/inscripcion/inscripcion-m.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  listadoInscr!: InscripcionMateria[];
  listadoUsers!: Usuario[];
  filterPost = "";

  constructor(private _Uservice: UsuariosService, private _Mservice: MensajesService, private router: Router, private _Iservice: InscripcionMService) { }

  ngOnInit(): void {
    this._Uservice.traerTodos().subscribe(data => {
      this.listadoUsers = data;
    });

    this._Iservice.traerTodos().subscribe(data => {
      this.listadoInscr = data;
    });
  }

  async eliminarUsuario(usuario: Usuario) {
    console.log(usuario);
    var hoy = new Date();
    usuario.estado = "BAJA";
    usuario.fechaBaja = hoy;
    
    console.log(usuario);
    var auxIdIns = "";
    var idUser = await this._Uservice.obtenerKeyUsuario(usuario);
    //Actualizo el estado en tabla Usuarios
    if (idUser != null) {
      this._Uservice.updateUsuarioEstado(idUser, usuario, "Usuario dado de baja", "La baja del usuario no pudo ser realizada");
    }
    //Actualizo el estado en lista Usuarios de las inscripciones
    this.listadoInscr.forEach(async ins => {
      ins.listaAlumnos.forEach(alum => {
        if(alum.uid == usuario.uid){
          alum.estado = usuario.estado;
          alum.fechaBaja = usuario.fechaBaja;
        }
      });
      auxIdIns = await this._Iservice.obtenerKey(ins);
      this._Iservice.updateRapido(auxIdIns, ins);
      // console.log(auxIdIns);
      // console.log(this.listadoInscr);
    });

    this.router.navigate(['/home']);
  }

  alumnosEliminados() {
    this.router.navigate(['/alumnosEliminados']);
  }

  trucho() {

    //Agregue el campo baja
    
    // console.log(this.listadoUsers);
    // var idUser = "";
    // this.listadoUsers.forEach(async user => {
    //   if (user.fechaBaja == null) {
    //     console.log("A");
    //     user.fechaBaja = null;

    //     idUser = await this._Uservice.obtenerKeyUsuario(user);

    //     this._Uservice.updateRapido(idUser, user);
    //   }
    // });
    // console.log("despues");
    // console.log(this.listadoUsers);
  }
}
