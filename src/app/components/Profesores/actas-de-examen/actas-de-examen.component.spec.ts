import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActasDeExamenComponent } from './actas-de-examen.component';

describe('ActasDeExamenComponent', () => {
  let component: ActasDeExamenComponent;
  let fixture: ComponentFixture<ActasDeExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActasDeExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActasDeExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
