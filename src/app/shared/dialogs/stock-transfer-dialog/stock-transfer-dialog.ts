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
import { StockTransferService } from '../../../core/services/stock-transfer-service';
import { Product } from '../../../core/services/product';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-stock-transfer-dialog',
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
  templateUrl: './stock-transfer-dialog.html',
  styleUrl: './stock-transfer-dialog.scss',
})
export class StockTransferDialog {

  form!: FormGroup;
  isLoading = false;
  products: any[] = [];
  warehouses: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private transferService: StockTransferService,
    private productService: Product,
    private snackbar: Snackbar,
    private warehouseService: WarehouseService,
    private dialogRef: MatDialogRef<StockTransferDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadLookups();

    this.form = this.formBuilder.group({
      date: [new Date(), Validators.required],
      sourceWarehouseId: [null, Validators.required],
      destinationWarehouseId: [null, Validators.required],
      lines: this.formBuilder.array([this.createLine()]),
    });
  }

  get lines(): FormArray {
    return this.form.get('lines') as FormArray;
  }

  createLine(): FormGroup {
    return this.formBuilder.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      batchNo: [''],
      notes: [''],
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

    const stockTransferData = this.form.value;

    if (stockTransferData.sourceWarehouseId === stockTransferData.destinationWarehouseId) {
      this.snackbar.warning('Source and Destination warehouse cannot be the same', 'Close');

      return;
    }

    this.isLoading = true;

    const payload = {
      ...stockTransferData,
      date: this.formatDate(stockTransferData.date),
    };

    this.transferService.createStockTransfer(payload).subscribe({
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
