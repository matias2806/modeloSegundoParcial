import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscMateriaAComponent } from './insc-materia-a.component';

describe('InscMateriaAComponent', () => {
  let component: InscMateriaAComponent;
  let fixture: ComponentFixture<InscMateriaAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscMateriaAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscMateriaAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
