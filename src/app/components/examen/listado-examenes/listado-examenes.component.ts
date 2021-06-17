import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Examen }from '../../../Models/Examen';
@Component({
  selector: 'app-listado-examenes',
  templateUrl: './listado-examenes.component.html',
  styleUrls: ['./listado-examenes.component.scss']
})
export class ListadoExamenesComponent implements OnInit {

  @Output()eventoExamenSeleccionado:EventEmitter<any> = new EventEmitter<any>();
  @Input()listadoExamenes!:Examen[];

  constructor() { }

  ngOnInit(): void {
  }

  enviarEventoExamenSeleccionado(examen: Examen){
    this.eventoExamenSeleccionado.emit(examen);
  }

}
