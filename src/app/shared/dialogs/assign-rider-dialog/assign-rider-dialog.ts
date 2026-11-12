import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DeliveryService } from '../../../core/services/delivery-service';
import { RiderService } from '../../../core/services/rider-service';
import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-assign-rider-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './assign-rider-dialog.html',
  styleUrl: './assign-rider-dialog.scss',
})
export class AssignRiderDialog {

  form!: FormGroup;
  riders: any[] = [];
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private deliveryService: DeliveryService,
    private riderService: RiderService,
    private snackbar: Snackbar,
    private dialogRef: MatDialogRef<AssignRiderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      riderId: [null, Validators.required],
    });

    this.riderService.getAvailableRiders().subscribe({
      next: (resp: any) => {
        this.riders = resp?.payLoad;
      },
      error: (err: any) => {
        this.snackbar.danger(err?.error?.message, 'Close');
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.deliveryService.assignRider(this.data.salesOrderId, this.form.value.riderId).subscribe({
        next: (resp: any) => {
          this.isLoading = false;
          this.snackbar.success(resp?.message, 'Close');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          this.isLoading = false;
          this.snackbar.danger(err?.error?.message, 'Close');
        },
      });
  }
}
