import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PurchaseReturnService } from '../../../core/services/purchase-return-service';
import { SupplierService } from '../../../core/services/supplier-service';
import { Product } from '../../../core/services/product';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { Snackbar } from '../../../core/services/snackbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDateModule,
    MatDivider
  ],
  templateUrl: './purchase-return-dialog.html',
  styleUrl: './purchase-return-dialog.scss',
})
export class PurchaseReturnDialog {

  form!: FormGroup;
  isLoading = false;
  suppliers: any[] = [];
  products: any[] = [];
  warehouses: any[] = [];

  reasonOptions = [
    'DAMAGED', 'EXPIRED', 'WRONG_ITEM', 'QUALITY_ISSUE', 'OVER_SUPPLY', 'OTHER',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private returnService: PurchaseReturnService,
    private supplierService: SupplierService,
    private productService: Product,
    private snackbar: Snackbar,
    private warehouseService: WarehouseService,
    private dialogRef: MatDialogRef<PurchaseReturnDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadLookups();
    this.form = this.formBuilder.group({
      supplierId: [null, Validators.required],
      returnDate: [new Date(), Validators.required],
      notes: [''],
      lines: this.formBuilder.array([this.createLine()]),
    });
  }

  get lines(): FormArray {
    return this.form.get('lines') as FormArray;
  }

  createLine(): FormGroup {
    return this.formBuilder.group({
      productId: [null, Validators.required],
      warehouseId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      unitPrice: [0],
      reason: ['DAMAGED'],
      batchNo: [''],
    });
  }

  addLine(): void {
    this.lines.push(this.createLine());
  }

  removeLine(i: number): void {
    if (this.lines.length > 1) this.lines.removeAt(i);
  }

  loadLookups(): void {
    this.supplierService.getAll().subscribe({
      next: (resp: any) => (this.suppliers = resp?.payLoad),
      error: (err: any) => (this.snackbar.danger(err?.error?.message, 'Close'))
    });
    this.productService.getAll().subscribe({
      next: (resp: any) => (this.products = resp?.payLoad),
      error: (err: any) => (this.snackbar.danger(err?.error?.message, 'Close'))
    });
    this.warehouseService.getAll().subscribe({
      next: (resp: any) => (this.warehouses = resp?.payLoad),
      error: (err: any) => (this.snackbar.danger(err?.error?.message, 'Close'))
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const purchaseReturnData = this.form.value;
    const payload = {
      ...purchaseReturnData,
      returnDate: new Date(purchaseReturnData.returnDate).toISOString().split('T')[0],
    };
    this.returnService.createPurchaReturn(payload).subscribe({
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
