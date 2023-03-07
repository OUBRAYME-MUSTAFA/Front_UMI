import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistesComponent } from './journalistes.component';

describe('JournalistesComponent', () => {
  let component: JournalistesComponent;
  let fixture: ComponentFixture<JournalistesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalistesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalistesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
