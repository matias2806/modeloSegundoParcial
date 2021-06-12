import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMatYalumnosComponent } from './ver-mat-yalumnos.component';

describe('VerMatYalumnosComponent', () => {
  let component: VerMatYalumnosComponent;
  let fixture: ComponentFixture<VerMatYalumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMatYalumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMatYalumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
