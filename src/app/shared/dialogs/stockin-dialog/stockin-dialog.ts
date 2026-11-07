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
import { StockInService } from '../../../core/services/stock-in-service';
import { SupplierService } from '../../../core/services/supplier-service';
import { Product } from '../../../core/services/product';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { Snackbar } from '../../../core/services/snackbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-stockin-dialog',
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
    MatDivider
],
  templateUrl: './stockin-dialog.html',
  styleUrl: './stockin-dialog.scss',
})
export class StockinDialog {

  form!: FormGroup;
  isLoading = false;
  suppliers: any[] = [];
  products: any[] = [];
  warehouses: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private stockInService: StockInService,
    private supplierService: SupplierService,
    private productService: Product,
    private snackbar: Snackbar,
    private warehouseService: WarehouseService,
    private dialogRef: MatDialogRef<StockinDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadLookups();

    this.form = this.formBuilder.group({
      supplierId: [null],
      date: [new Date(), Validators.required],
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
      expense: [0],
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
      next: (res: any) => (this.suppliers = res?.payLoad),
      error: (err: any) => (err?.error?.message, 'Close'),
    });
    this.productService.getAll().subscribe({
      next: (res: any) => (this.products = res?.payLoad),
      error: (err: any) => (err?.error?.message, 'Close'),
    });
    this.warehouseService.getAll().subscribe({
      next: (res: any) => (this.warehouses = res?.payLoad),
      error: (err: any) => (err?.error?.message, 'Close'),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const stockInData = this.form.value;

    const payload = {
      ...stockInData,
      date: this.formatDate(stockInData.date),
    };

    this.stockInService.createStockIn(payload).subscribe({
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

  private formatDate(d: any): string {
    if (!d) return '';
    return new Date(d).toISOString().split('T')[0];
  }
}
