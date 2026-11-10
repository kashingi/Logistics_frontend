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
import { SalesOrderService } from '../../../core/services/sales-order-service';
import { Product } from '../../../core/services/product';
import { Snackbar } from '../../../core/services/snackbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-sales-order-dialog',
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
  templateUrl: './sales-order-dialog.html',
  styleUrl: './sales-order-dialog.scss',
})
export class SalesOrderDialog {

  form!: FormGroup;
  isLoading = false;
  products: any[] = [];

  priceTiers = ['RETAIL', 'WHOLESALE'];
  fulfilmentOptions = ['PICKUP', 'DELIVERY'];

  constructor(
    private formBuilder: FormBuilder,
    private orderService: SalesOrderService,
    private productService: Product,
    private snackbar: Snackbar,
    private dialogRef: MatDialogRef<SalesOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      kraPin: [''],
      salespersonName: ['', Validators.required],
      salespersonCode: ['', Validators.required],
      date: [new Date()],
      notes: [''],
      terms: [''],
      buildingLandmark: [''],
      street: [''],
      houseNo: [''],
      contactPerson: [''],
      contactPhone: [''],
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
      priceTier: ['RETAIL'],
      discount: [0],
      fulfilment: ['DELIVERY'],
    });
  }

  addLine(): void {
    this.lines.push(this.createLine());
  }

  removeLine(i: number): void {
    if (this.lines.length > 1) this.lines.removeAt(i);
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (resp: any) => (this.products = resp?.payLoad),
      error: (err: any) => (this.snackbar.danger(err?.error?.message, 'Close'))
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const salesOderData = this.form.value;

    const payload = {
      ...salesOderData,
      customerName: `${salesOderData.firstName} ${salesOderData.lastName}`.trim(),
      date: this.formatDate(salesOderData.date),
    };

    this.orderService.createSalesOrder(payload).subscribe({
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
