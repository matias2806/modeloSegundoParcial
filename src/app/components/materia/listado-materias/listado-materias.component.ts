import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Materia } from 'src/app/Models/Materia';

@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.component.html',
  styleUrls: ['./listado-materias.component.scss']
})
export class ListadoMateriasComponent implements OnInit {

  @Output()eventoMateriaSeleccionada:EventEmitter<any> = new EventEmitter<any>();
  @Input()listadoMaterias!:Materia[];

  constructor() { }

  ngOnInit(): void {
  }


  enviarEventoMateriaSeleccionada(materia: Materia){
    this.eventoMateriaSeleccionada.emit(materia);
  }
}
