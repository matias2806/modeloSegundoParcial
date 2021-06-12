import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../../../Models/Usuario';
import { FiltroUsuariosPipe } from '../../../../pipes/filtro-usuarios.pipe';
@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  listadoUsers!: Usuario[];
  filterPost="";

  constructor(private _Uservice: UsuariosService, private _Mservice: MensajesService){}

  ngOnInit(): void {
    this._Uservice.traerTodos().subscribe(data => {
      this.listadoUsers = data;
    });
  }

  

}
