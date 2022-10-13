import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentUsgComponent } from './president-usg.component';

describe('PresidentUsgComponent', () => {
  let component: PresidentUsgComponent;
  let fixture: ComponentFixture<PresidentUsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentUsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresidentUsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
