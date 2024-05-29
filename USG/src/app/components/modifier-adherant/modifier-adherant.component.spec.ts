import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAdherantComponent } from './modifier-adherant.component';

describe('ModifierAdherantComponent', () => {
  let component: ModifierAdherantComponent;
  let fixture: ComponentFixture<ModifierAdherantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierAdherantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierAdherantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
