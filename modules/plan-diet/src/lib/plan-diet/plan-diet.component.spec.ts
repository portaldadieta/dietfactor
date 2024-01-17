import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanDietComponent } from './plan-diet.component';

describe('PlanDietComponent', () => {
  let component: PlanDietComponent;
  let fixture: ComponentFixture<PlanDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDietComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
