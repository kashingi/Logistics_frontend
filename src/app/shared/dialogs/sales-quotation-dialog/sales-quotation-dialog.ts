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
import { SalesQuotationService } from '../../../core/services/sales-quotation-service';
import { Product } from '../../../core/services/product';
import { Snackbar } from '../../../core/services/snackbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-sales-quotation-dialog',
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
  templateUrl: './sales-quotation-dialog.html',
  styleUrl: './sales-quotation-dialog.scss',
})
export class SalesQuotationDialog {

  form!: FormGroup;
  isLoading = false;
  products: any[] = [];
  termsOptions = ['Payment on delivery', 'Cash on delivery', 'Pay before delivery', 'Partial payment on order, balance on delivery', 'Net 15', 'Net 30'];

  priceTiers = ['RETAIL', 'WHOLESALE'];
  fulfilmentOptions = ['PICKUP', 'DELIVERY'];

  constructor(
    private formBuilder: FormBuilder,
    private quotationService: SalesQuotationService,
    private productService: Product,
    private snackBar: Snackbar,
    private dialogRef: MatDialogRef<SalesQuotationDialog>,
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
      error: (err: any) => (this.snackBar.danger(err?.error?.message, 'Close'))
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const salesQuotationsData = this.form.value;

    const payload = {
      ...salesQuotationsData,
      customerName: `${salesQuotationsData.firstName} ${salesQuotationsData.lastName}`.trim(),
      date: this.formatDate(salesQuotationsData.date),
    };

    this.quotationService.createSalesQuotation(payload).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackBar.success(resp?.message, 'Close');
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      },
    });
  }

  private formatDate(d: any): string {
    if (!d) return '';
    return new Date(d).toISOString().split('T')[0];
  }
}
