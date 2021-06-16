import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../../../Models/Usuario';
import { FiltroUsuariosPipe } from '../../../../pipes/filtro-usuarios.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  listadoUsers!: Usuario[];
  filterPost = "";

  constructor(private _Uservice: UsuariosService, private _Mservice: MensajesService,private router: Router) { }

  ngOnInit(): void {
    this._Uservice.traerTodos().subscribe(data => {
      this.listadoUsers = data;
    });
  }

  async eliminarUsuario(usuario: Usuario) {
    console.log(usuario);
    usuario.estado = "BAJA"

    var idUser = await this._Uservice.obtenerKeyUsuario(usuario);
    if (idUser != null) {
      this._Uservice.updateUsuarioEstado(idUser, usuario, "Usuario dado de baja", "La baja del usuario no pudo ser realizada");
    }
    this.router.navigate(['/home']);
  }


}
