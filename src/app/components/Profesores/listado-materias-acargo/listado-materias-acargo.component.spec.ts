import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMateriasACargoComponent } from './listado-materias-acargo.component';

describe('ListadoMateriasACargoComponent', () => {
  let component: ListadoMateriasACargoComponent;
  let fixture: ComponentFixture<ListadoMateriasACargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMateriasACargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMateriasACargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
