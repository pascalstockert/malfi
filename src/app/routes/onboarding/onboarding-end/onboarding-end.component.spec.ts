import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingEndComponent } from './onboarding-end.component';

describe('OnboardingEndComponent', () => {
  let component: OnboardingEndComponent;
  let fixture: ComponentFixture<OnboardingEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingEndComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
