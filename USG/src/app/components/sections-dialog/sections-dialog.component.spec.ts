import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsDialogComponent } from './sections-dialog.component';

describe('SectionsDialogComponent', () => {
  let component: SectionsDialogComponent;
  let fixture: ComponentFixture<SectionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
