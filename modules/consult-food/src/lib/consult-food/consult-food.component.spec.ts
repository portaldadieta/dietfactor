import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultFoodComponent } from './consult-food.component';

describe('ConsultFoodComponent', () => {
  let component: ConsultFoodComponent;
  let fixture: ComponentFixture<ConsultFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultFoodComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
