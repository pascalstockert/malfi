import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingIntentionsComponent } from './onboarding-intentions.component';

describe('OnboardingIntentionsComponent', () => {
  let component: OnboardingIntentionsComponent;
  let fixture: ComponentFixture<OnboardingIntentionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingIntentionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingIntentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
