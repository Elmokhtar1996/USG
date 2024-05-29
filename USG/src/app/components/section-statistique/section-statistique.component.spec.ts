import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStatistiqueComponent } from './section-statistique.component';

describe('SectionStatistiqueComponent', () => {
  let component: SectionStatistiqueComponent;
  let fixture: ComponentFixture<SectionStatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionStatistiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
