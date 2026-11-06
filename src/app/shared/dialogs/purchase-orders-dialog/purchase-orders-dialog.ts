import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PurchaseOrderService } from '../../../core/services/purchase-order-service';
import { SupplierService } from '../../../core/services/supplier-service';
import { Product } from '../../../core/services/product';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { Snackbar } from '../../../core/services/snackbar';


@Component({
  selector: 'app-purchase-orders-dialog',
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
  ],
  templateUrl: './purchase-orders-dialog.html',
  styleUrl: './purchase-orders-dialog.scss',
})
export class PurchaseOrdersDialog {

  form!: FormGroup;
  isLoading = false;
  suppliers: any[] = [];
  products: any[] = [];
  warehouses: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private poService: PurchaseOrderService,
    private supplierService: SupplierService,
    private productService: Product,
    private snackbar: Snackbar,
    private warehouseService: WarehouseService,
    private dialogRef: MatDialogRef<PurchaseOrdersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadLookups();

    this.form = this.formBuilder.group({
      supplierId: [null, Validators.required],
      orderDate: [new Date(), Validators.required],
      expectedDeliveryDate: [null],
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
      discount: [0],
      taxRate: [16],
    });
  }

  addLine(): void {
    this.lines.push(this.createLine());
  }

  removeLine(index: number): void {
    if (this.lines.length > 1) this.lines.removeAt(index);
  }

  loadLookups(): void {
    this.supplierService.getAll().subscribe({
      next: (res: any) => this.suppliers = res?.payLoad,
      error: (err: any) => this.snackbar.danger(err?.error?.message, 'Close'),
    });
    this.productService.getAll().subscribe({
      next: (res: any) => this.products = res?.payLoad,
      error: (err: any) => this.snackbar.danger(err?.error?.message, 'Close'),
    });
    this.warehouseService.getAll().subscribe({
      next: (res: any) => this.warehouses = res?.payLoad,
      error: (err: any) => this.snackbar.danger(err?.error?.message, 'Close'),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const value = this.form.value;

    // Format dates as yyyy-MM-dd
    const payload = {
      ...value,
      orderDate: this.formatDate(value.orderDate),
      expectedDeliveryDate: value.expectedDeliveryDate
        ? this.formatDate(value.expectedDeliveryDate)
        : null,
    };

    this.poService.create(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }

  private formatDate(d: any): string {
    if (!d) return '';
    const date = new Date(d);
    return date.toISOString().split('T')[0];
  }
}
