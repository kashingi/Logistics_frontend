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
import { StockOutService } from '../../../core/services/stock-out-service';
import { Product } from '../../../core/services/product';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { Snackbar } from '../../../core/services/snackbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-stockout-dialog',
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
  templateUrl: './stockout-dialog.html',
  styleUrl: './stockout-dialog.scss',
})
export class StockoutDialog {

  form!: FormGroup;
  isLoading = false;
  products: any[] = [];
  warehouses: any[] = [];

  reasonOptions = [
    'EXPIRED',
    'DAMAGED',
    'OFFER_GIVEAWAY',
    'INTERNAL_CONSUMPTION',
    'LOST',
    'THEFT',
    'SHRINKAGE',
    'STOCKTAKE_VARIANCE',
    'INVENTORY_CORRECTION',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private stockOutService: StockOutService,
    private productService: Product,
    private snackbar: Snackbar,
    private warehouseService: WarehouseService,
    private dialogRef: MatDialogRef<StockoutDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadLookups();

    this.form = this.formBuilder.group({
      date: [new Date(), Validators.required],
      stockOutReason: [null, Validators.required],
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
    const stockOutData = this.form.value;

    const payload = {
      ...stockOutData,
      date: this.formatDate(stockOutData.date),
    };

    this.stockOutService.createStockOut(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
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
