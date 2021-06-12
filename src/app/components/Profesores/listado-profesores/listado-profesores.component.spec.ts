import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProfesoresComponent } from './listado-profesores.component';

describe('ListadoProfesoresComponent', () => {
  let component: ListadoProfesoresComponent;
  let fixture: ComponentFixture<ListadoProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoProfesoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
