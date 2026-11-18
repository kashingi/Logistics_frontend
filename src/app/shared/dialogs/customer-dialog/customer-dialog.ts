import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomerService } from '../../../core/services/customer-service';
import { Snackbar } from '../../../core/services/snackbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-customer-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDivider
],
  templateUrl: './customer-dialog.html',
  styleUrl: './customer-dialog.scss',
})
export class CustomerDialog {

   form!: FormGroup;
  isLoading = false;
  isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackbar: Snackbar,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data?.mode === 'edit';
    const customer = this.data?.customer || {};

    this.form = this.formBuilder.group({
      firstName: [customer.firstName || '', Validators.required],
      lastName: [customer.lastName || ''],
      phone: [customer.phone || '', Validators.required],
      email: [customer.email || ''],
      kraPin: [customer.kraPin || ''],
      street: [customer.street || ''],
      city: [customer.city || ''],
      buildingLandmark: [customer.buildingLandmark || ''],
      houseNo: [customer.houseNo || ''],
      contactPerson: [customer.contactPerson || ''],
      contactPhone: [customer.contactPhone || ''],
      status: [customer.status || 'ACTIVE'],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const customerData = this.form.value;
    const payload = {
      ...customerData,
      name: `${customerData.firstName} ${customerData.lastName || ''}`.trim(),
    };

    const req$ = this.isEdit
      ? this.customerService.updateCustomer(this.data.customer.id, payload)
      : this.customerService.createCustomer(payload);

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
