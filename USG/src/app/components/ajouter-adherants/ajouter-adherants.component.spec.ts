import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAdherantsComponent } from './ajouter-adherants.component';

describe('AjouterAdherantsComponent', () => {
  let component: AjouterAdherantsComponent;
  let fixture: ComponentFixture<AjouterAdherantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterAdherantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterAdherantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
