import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


const MATERIAL_MODULES = [MatIcon];

@Component({
  selector: 'dietfactor-alert-message-modal',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_MODULES],
  templateUrl: './alert-message-modal.component.html',
  styleUrl: './alert-message-modal.component.scss',
})
export class AlertMessageModalComponent {
  @Input() feedbackMessage!: string;
  @Input() icon!: string;

  public alertMessageModal: MatDialogRef<AlertMessageModalComponent> = inject(MatDialogRef);
  public alertMessage: {
    icon: string;
    message: string;
  } = inject(MAT_DIALOG_DATA);

  closeAlertMessageModal(): void {
    this.alertMessageModal.close();
  }

}
