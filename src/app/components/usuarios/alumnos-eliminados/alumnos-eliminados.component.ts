import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../../Models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos-eliminados',
  templateUrl: './alumnos-eliminados.component.html',
  styleUrls: ['./alumnos-eliminados.component.scss']
})
export class AlumnosEliminadosComponent implements OnInit {

  listadoUsers!: Usuario[];
  
  constructor(private _Uservice: UsuariosService, private _Mservice: MensajesService,private router: Router) { }

  ngOnInit(): void {
    this._Uservice.traerTodos().subscribe(data => {
      this.listadoUsers = data;
    });
  }

}
