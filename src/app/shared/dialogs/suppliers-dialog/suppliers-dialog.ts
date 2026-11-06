import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Snackbar } from '../../../core/services/snackbar';
import { SupplierService } from '../../../core/services/supplier-service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-suppliers-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule
],
  templateUrl: './suppliers-dialog.html',
  styleUrl: './suppliers-dialog.scss',
})
export class SuppliersDialog {

  form!: FormGroup;
  isLoading = false;
  isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: SupplierService,
    private snackbar: Snackbar,
    private dialogRef: MatDialogRef<SuppliersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.isEdit = this.data?.mode === 'edit';
    const supplier = this.data?.warehouse || {};

    this.form = this.formBuilder.group({
      name: [supplier.name || '', Validators.required],
      contactPerson: [supplier.contactPerson || ''],
      phone: [supplier.phone || ''],
      email: [supplier.email || ''],
      paymentTerms: [supplier.paymentTerms || 'DUE_ON_RECEIPT'],
      street: [supplier.street || ''],
      city: [supplier.city || ''],
      postal: [supplier.postal || ''],
      status: [supplier.status || 'ACTIVE'],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const supplierData = this.form.value;
    const warehouseId = this.isEdit ? this.data.warehouse.id : null;
    this.isLoading = true;
    const req$ = this.isEdit
      ? this.service.updateSupplier(warehouseId, supplierData)
      : this.service.createSupplier(supplierData);

    req$.subscribe({
      next: (resp: any) => {
        this.snackbar.success(resp?.message, 'Close');
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.dialogRef.close(true);
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }
}
