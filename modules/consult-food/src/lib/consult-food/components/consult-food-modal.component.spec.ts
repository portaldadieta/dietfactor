import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultFoodModalComponent } from './consult-food-modal.component';

describe('ConsultFoodModalComponent', () => {
  let component: ConsultFoodModalComponent;
  let fixture: ComponentFixture<ConsultFoodModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultFoodModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultFoodModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
