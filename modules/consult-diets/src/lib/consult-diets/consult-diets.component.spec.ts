import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultDietsComponent } from './consult-diets.component';

describe('ConsultDietsComponent', () => {
  let component: ConsultDietsComponent;
  let fixture: ComponentFixture<ConsultDietsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultDietsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultDietsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
