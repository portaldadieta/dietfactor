import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodAmountModalComponent } from './food-amount-modal.component';

describe('FoodAmountModalComponent', () => {
  let component: FoodAmountModalComponent;
  let fixture: ComponentFixture<FoodAmountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodAmountModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodAmountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
