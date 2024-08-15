import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStartComponent } from './onboarding-start.component';

describe('OnboardingStartComponent', () => {
  let component: OnboardingStartComponent;
  let fixture: ComponentFixture<OnboardingStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
