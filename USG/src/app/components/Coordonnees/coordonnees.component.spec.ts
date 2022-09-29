import { ComponentFixture, TestBed } from '@angular/core/testing';

import { coordonneesComponent } from './coordonnees.component';

describe('coordonneesComponent', () => {
  let component: coordonneesComponent;
  let fixture: ComponentFixture<coordonneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ coordonneesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(coordonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
