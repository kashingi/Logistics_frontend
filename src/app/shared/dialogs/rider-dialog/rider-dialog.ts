import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RiderService } from '../../../core/services/rider-service';
import { DeliveryZoneService } from '../../../core/services/delivery-zone-service';
import { Snackbar } from '../../../core/services/snackbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-rider-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDivider
  ],
  templateUrl: './rider-dialog.html',
  styleUrl: './rider-dialog.scss',
})
export class RiderDialog {

  form!: FormGroup;
  isLoading = false;
  isEdit = false;
  zones: any[] = [];

  vehicleTypes = [
    'Electric scooter',
    'Regular Bike',
    'Motorcycle',
    'Van',
    'Other',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private riderService: RiderService,
    private snackbar: Snackbar,
    private zoneService: DeliveryZoneService,
    private dialogRef: MatDialogRef<RiderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.isEdit = this.data?.mode === 'edit';
    this.loadZones();

    const rider = this.data?.rider || {};

    this.form = this.formBuilder.group({
      firstName: [rider.firstName || '', Validators.required],
      lastName: [rider.lastName || '', Validators.required],
      phone: [rider.phone || '', Validators.required],
      nationalIdOrPassport: [rider.nationalIdOrPassport || ''],
      dateJoined: [rider.dateJoined ? new Date(rider.dateJoined) : new Date()],
      vehicleRegistrationNo: [rider.vehicleRegistrationNo || ''],
      vehicleType: [rider.vehicleType || ''],
      carryingCapacityKg: [rider.carryingCapacityKg || null],
      contractDurationMonths: [rider.contractDurationMonths || null],
      currentZoneId: [rider.currentZone?.id || rider.currentZoneId || null],
      status: [rider.status || 'ACTIVE'],
    });
  }

  loadZones(): void {
    this.zoneService.getAllDeliveryZones().subscribe({
      next: (resp: any) => (this.zones = resp?.payLoad),
      error: (err: any) => (this.snackbar.danger(err?.error?.message, 'Close'))
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const RiderData = this.form.value;

    const payload = {
      ...RiderData,
      dateJoined: RiderData.dateJoined
        ? new Date(RiderData.dateJoined).toISOString().split('T')[0]
        : null,
    };

    const req$ = this.isEdit
      ? this.riderService.updateRider(this.data.rider.id, payload)
      : this.riderService.createRider(payload);

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
