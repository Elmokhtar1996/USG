import { ComponentFixture, TestBed } from '@angular/core/testing';

import { adherantsComponent } from './adherants.component';

describe('adherantsComponent', () => {
  let component: adherantsComponent;
  let fixture: ComponentFixture<adherantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ adherantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(adherantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
