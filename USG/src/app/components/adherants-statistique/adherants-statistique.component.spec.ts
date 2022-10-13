import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherantsStatistiqueComponent } from './adherants-statistique.component';

describe('AdherantsStatistiqueComponent', () => {
  let component: AdherantsStatistiqueComponent;
  let fixture: ComponentFixture<AdherantsStatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdherantsStatistiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdherantsStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
