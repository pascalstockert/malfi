import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingGoalsTasksComponent } from './onboarding-goals-tasks.component';

describe('OnboardingGoalsTasksComponent', () => {
  let component: OnboardingGoalsTasksComponent;
  let fixture: ComponentFixture<OnboardingGoalsTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingGoalsTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingGoalsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
