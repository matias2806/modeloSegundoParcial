import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../../Models/Usuario';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss']
})
export class ListadoAlumnosComponent implements OnInit {

  @Output()eventoAlumnoSeleccionado:EventEmitter<any> = new EventEmitter<any>();
  @Input()listadoAlumnos!:Usuario[];

  constructor() { }

  ngOnInit(): void {
  }

  enviarEventoAlumnoSeleccionado(profesor: Usuario){
    this.eventoAlumnoSeleccionado.emit(profesor);
  }
}
