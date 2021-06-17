import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListadoExamenesComponent } from './ver-listado-examenes.component';

describe('VerListadoExamenesComponent', () => {
  let component: VerListadoExamenesComponent;
  let fixture: ComponentFixture<VerListadoExamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerListadoExamenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerListadoExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
