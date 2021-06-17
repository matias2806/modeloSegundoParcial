import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarExamenComponent } from './cargar-examen.component';

describe('CargarExamenComponent', () => {
  let component: CargarExamenComponent;
  let fixture: ComponentFixture<CargarExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
