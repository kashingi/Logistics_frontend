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
import { GrnService } from '../../../core/services/grn-service';
import { SupplierService } from '../../../core/services/supplier-service';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { PurchaseOrderService } from '../../../core/services/purchase-order-service';
import { Product } from '../../../core/services/product';
import { Snackbar } from '../../../core/services/snackbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-grn-dialog',
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
    MatDivider,
],
  templateUrl: './grn-dialog.html',
  styleUrl: './grn-dialog.scss',
})
export class GrnDialog {

  form!: FormGroup;
  isLoading = false;
  suppliers: any[] = [];
  products: any[] = [];
  warehouses: any[] = [];
  purchaseOrders: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private grnService: GrnService,
    private supplierService: SupplierService,
    private productService: Product,
    private snackbar: Snackbar,
    private warehouseService: WarehouseService,
    private poService: PurchaseOrderService,
    private dialogRef: MatDialogRef<GrnDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadLookups();
    this.form = this.formBuilder.group({
      supplierId: [null, Validators.required],
      purchaseOrderId: [null],
      receivedDate: [new Date(), Validators.required],
      fulfilmentType: ['PARTIAL'],
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
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      taxRate: [16],
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
      error: (err: any) => this.snackbar.danger(err?.error?.message, 'Close'),
    });
    this.productService.getAll().subscribe({
      next: (resp: any) => (this.products = resp?.payLoad),
      error: (err: any) => this.snackbar.danger(err?.error?.message, 'Close'),
    });
    this.warehouseService.getAll().subscribe({
      next: (resp: any) => (this.warehouses = resp?.payLoad),
      error: (err: any) => this.snackbar.danger(err?.error?.message, 'Close'),
    });
    this.poService.getAllPOs().subscribe({
      next: (resp: any) => (this.purchaseOrders = resp?.payLoad),
      error: (err: any) => this.snackbar.danger(err?.error?.message, 'Close'),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const grnData = this.form.value;
    const payload = {
      ...grnData,
      receivedDate: this.formatDate(grnData.receivedDate),
    };
    this.grnService.createGRN(payload).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.dialogRef.close(true);
        this.snackbar.success(resp?.message, 'Close');
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }

  private formatDate(d: any): string {
    if (!d) return '';
    return new Date(d).toISOString().split('T')[0];
  }
}
