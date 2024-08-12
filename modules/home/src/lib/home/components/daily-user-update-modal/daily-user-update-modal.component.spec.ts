import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyUserUpdateModalComponent } from './daily-user-update-modal.component';

describe('DailyUserUpdateModalComponent', () => {
  let component: DailyUserUpdateModalComponent;
  let fixture: ComponentFixture<DailyUserUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyUserUpdateModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyUserUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
