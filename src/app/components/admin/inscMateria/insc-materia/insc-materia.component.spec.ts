import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscMateriaComponent } from './insc-materia.component';

describe('InscMateriaComponent', () => {
  let component: InscMateriaComponent;
  let fixture: ComponentFixture<InscMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
