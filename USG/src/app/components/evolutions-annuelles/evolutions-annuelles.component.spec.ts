import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionsAnnuellesComponent } from './evolutions-annuelles.component';

describe('EvolutionsAnnuellesComponent', () => {
  let component: EvolutionsAnnuellesComponent;
  let fixture: ComponentFixture<EvolutionsAnnuellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionsAnnuellesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionsAnnuellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
