import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/Models/Examen';
import { ExamenService } from 'src/app/services/examen/examen.service';

@Component({
  selector: 'app-ver-listado-examenes',
  templateUrl: './ver-listado-examenes.component.html',
  styleUrls: ['./ver-listado-examenes.component.scss']
})
export class VerListadoExamenesComponent implements OnInit {

  listadoExam: Examen[] = [];
  constructor(private _Eservice: ExamenService,) { }

  ngOnInit(): void {
    this._Eservice.traerTodos().subscribe((examen: Examen[]) => {
      this.listadoExam = examen;
    });

  }

  cargarExamenSeleccionado($event) {

  }
}
