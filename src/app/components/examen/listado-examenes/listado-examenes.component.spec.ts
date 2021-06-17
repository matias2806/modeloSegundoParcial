import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoExamenesComponent } from './listado-examenes.component';

describe('ListadoExamenesComponent', () => {
  let component: ListadoExamenesComponent;
  let fixture: ComponentFixture<ListadoExamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoExamenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
