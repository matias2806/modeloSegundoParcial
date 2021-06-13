import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAlumnosPorMateriasComponent } from './listado-alumnos-por-materias.component';

describe('ListadoAlumnosPorMateriasComponent', () => {
  let component: ListadoAlumnosPorMateriasComponent;
  let fixture: ComponentFixture<ListadoAlumnosPorMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoAlumnosPorMateriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAlumnosPorMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
