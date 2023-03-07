import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningExamensComponent } from './planning-examens.component';

describe('PlanningExamensComponent', () => {
  let component: PlanningExamensComponent;
  let fixture: ComponentFixture<PlanningExamensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningExamensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningExamensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
