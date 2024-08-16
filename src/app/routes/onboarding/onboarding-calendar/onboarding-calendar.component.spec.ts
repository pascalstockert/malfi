import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingCalendarComponent } from './onboarding-calendar.component';

describe('OnboardingCalendarComponent', () => {
  let component: OnboardingCalendarComponent;
  let fixture: ComponentFixture<OnboardingCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
