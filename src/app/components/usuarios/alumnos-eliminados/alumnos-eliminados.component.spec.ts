import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosEliminadosComponent } from './alumnos-eliminados.component';

describe('AlumnosEliminadosComponent', () => {
  let component: AlumnosEliminadosComponent;
  let fixture: ComponentFixture<AlumnosEliminadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnosEliminadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosEliminadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
