import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DeliveryZoneService } from '../../../core/services/delivery-zone-service';
import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-delivery-zone-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './delivery-zone-dialog.html',
  styleUrl: './delivery-zone-dialog.scss',
})
export class DeliveryZoneDialog {

  form!: FormGroup;
  isLoading = false;
  isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private zoneService: DeliveryZoneService,
    private snackbar: Snackbar,
    private dialogRef: MatDialogRef<DeliveryZoneDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data?.mode === 'edit';
    const deliveryZone = this.data?.zone || {};

    this.form = this.formBuilder.group({
      name: [deliveryZone.name || '', Validators.required],
      locationsText: [(deliveryZone.locations || []).join(', ') || ''],
      status: [deliveryZone.status || 'ACTIVE'],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const locations = (this.form.value.locationsText || '')
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => !!s);

    const payload = {
      name: this.form.value.name,
      locations,
      status: this.form.value.status,
    };

    const req$ = this.isEdit
      ? this.zoneService.updateDeliveryZone(this.data.zone.id, payload)
      : this.zoneService.createDeliveryZone(payload);

    req$.subscribe({
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
