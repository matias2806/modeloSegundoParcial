import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InscripcionMateria } from '../../../Models/InscripcionMateria';
@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {

  @Output()eventoInscripcionSeleccionada:EventEmitter<any> = new EventEmitter<any>();
  @Input()listadoInscripciones!:InscripcionMateria[];

  constructor() { }

  ngOnInit(): void {
  }

  enviarEventoAlumnoSeleccionado(inscripcion: InscripcionMateria){
    this.eventoInscripcionSeleccionada.emit(inscripcion);
  }
}
