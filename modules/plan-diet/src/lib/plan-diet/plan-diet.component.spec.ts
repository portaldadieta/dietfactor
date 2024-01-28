import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanDietComponent } from './plan-diet.component';
import { NavbarComponent } from '@dietfactor/modules/navbar';

describe('PlanDietComponent', () => {
  let component: PlanDietComponent;
  let fixture: ComponentFixture<PlanDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDietComponent, NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
