import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../../Models/Usuario';
@Component({
  selector: 'app-listado-profesores',
  templateUrl: './listado-profesores.component.html',
  styleUrls: ['./listado-profesores.component.scss']
})
export class ListadoProfesoresComponent implements OnInit {

  @Output()eventoProfesorSeleccionado:EventEmitter<any> = new EventEmitter<any>();
  @Input()listadoProfesores!:Usuario[];

  constructor() { }

  ngOnInit(): void {
  }

  enviarEventoProfesorSeleccionado(profesor: Usuario){
    this.eventoProfesorSeleccionado.emit(profesor);
  }
}
