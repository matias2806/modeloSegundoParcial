import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMisInscripcionesComponent } from './ver-mis-inscripciones.component';

describe('VerMisInscripcionesComponent', () => {
  let component: VerMisInscripcionesComponent;
  let fixture: ComponentFixture<VerMisInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMisInscripcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMisInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
