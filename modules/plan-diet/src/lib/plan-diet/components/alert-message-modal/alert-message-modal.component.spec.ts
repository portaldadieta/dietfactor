import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertMessageModalComponent } from './alert-message-modal.component';

describe('AlertMessageModalComponent', () => {
  let component: AlertMessageModalComponent;
  let fixture: ComponentFixture<AlertMessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertMessageModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
