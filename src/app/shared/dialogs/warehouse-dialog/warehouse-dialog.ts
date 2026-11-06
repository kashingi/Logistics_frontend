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
import { WarehouseService } from '../../../core/services/warehouse-service';
import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-warehouse-dialog',
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
  ],
  templateUrl: './warehouse-dialog.html',
  styleUrl: './warehouse-dialog.scss',
})
export class WarehouseDialog {

  form!: FormGroup;
  isLoading = false;
  isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: WarehouseService,
    private snackbar: Snackbar,
    private dialogRef: MatDialogRef<WarehouseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.isEdit = this.data?.mode === 'edit';
    const warehouse = this.data?.warehouse || {};

    this.form = this.formBuilder.group({
      name: [warehouse.name || '', Validators.required],
      category: [warehouse.category || ''],
      street: [warehouse.street || ''],
      city: [warehouse.city || ''],
      postal: [warehouse.postal || ''],
      contactPerson: [warehouse.contactPerson || ''],
      phone: [warehouse.phone || ''],
      email: [warehouse.email || ''],
      remark: [warehouse.remark || ''],
      allowNegativeInventory: [warehouse.allowNegativeInventory || false],
      status: [warehouse.status || 'ACTIVE'],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const warehouseData = this.form.value;
    const warehouseId = this.isEdit ? this.data.warehouse.id : null;
    this.isLoading = true;
    const req$ = this.isEdit
      ? this.service.updateWarehouse(warehouseId, warehouseData)
      : this.service.createWarehouse(warehouseData);

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
