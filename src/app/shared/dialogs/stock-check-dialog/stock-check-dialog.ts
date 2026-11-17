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
import { StockCheckService } from '../../../core/services/stock-check-service';
import { Product } from '../../../core/services/product';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { StockLevelService } from '../../../core/services/stock-level-service';
import { Snackbar } from '../../../core/services/snackbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-stock-check-dialog',
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
  templateUrl: './stock-check-dialog.html',
  styleUrl: './stock-check-dialog.scss',
})
export class StockCheckDialog {

  form!: FormGroup;
  isLoading = false;
  products: any[] = [];
  warehouses: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private checkService: StockCheckService,
    private productService: Product,
    private snackbar: Snackbar,
    private warehouseService: WarehouseService,
    private stockLevelService: StockLevelService,
    private dialogRef: MatDialogRef<StockCheckDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadLookups();
    this.form = this.formBuilder.group({
      warehouseId: [null, Validators.required],
      checkDate: [new Date(), Validators.required],
      description: [''],
      lines: this.formBuilder.array([this.createLine()]),
    });
  }

  get lines(): FormArray {
    return this.form.get('lines') as FormArray;
  }

  createLine(systemQty: number = 0): FormGroup {
    return this.formBuilder.group({
      productId: [null, Validators.required],
      batchNo: [''],
      systemQty: [systemQty],
      countedQty: [0, [Validators.required, Validators.min(0)]],
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
      error: (err: any) => (err?.error?.message)
    });
    this.warehouseService.getAll().subscribe({
      next: (resp: any) => (this.warehouses = resp?.payLoad),
      error: (err: any) => (err?.error?.message)
    });
  }

  /** Optional: when warehouse changes, preload system quantities */
  onWarehouseChange(): void {
    const wid = this.form.value.warehouseId;
    if (!wid) return;
    this.stockLevelService.getStockByWarehouse(wid).subscribe({
      next: (res: any) => {
        const levels = res?.payLoad || res?.data || [];
        while (this.lines.length) this.lines.removeAt(0);
        if (levels.length === 0) {
          this.lines.push(this.createLine());
          return;
        }
        levels.forEach((lvl: any) => {
          this.lines.push(
            this.formBuilder.group({
              productId: [lvl.product?.id, Validators.required],
              batchNo: [lvl.batch?.lotNumber || ''],
              systemQty: [Number(lvl.quantityOnHand || 0)],
              countedQty: [Number(lvl.quantityOnHand || 0), [Validators.required, Validators.min(0)]],
              notes: [''],
            })
          );
        });
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const stcokData = this.form.value;
    const payload = {
      ...stcokData,
      checkDate: new Date(stcokData.checkDate).toISOString().split('T')[0],
    };
    this.checkService.createStockCheck(payload).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, 'Close')
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }
}
