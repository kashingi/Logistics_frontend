import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SalesQuotationService } from '../../../core/services/sales-quotation-service';
import { Snackbar } from '../../../core/services/snackbar';
import { SalesQuotationDialog } from '../../../shared/dialogs/sales-quotation-dialog/sales-quotation-dialog';
import { SalesQuotationView } from '../../../shared/dialogs/sales-quotation-view/sales-quotation-view';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-sales-quotation',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatNativeDateModule
  ],
  templateUrl: './sales-quotation.html',
  styleUrl: './sales-quotation.scss',
})
export class SalesQuotation {

  quotations: any[] = [];
  displayedColumns = ['sqNumber', 'customer', 'date', 'totalAmount', 'status', 'actions'];
  isLoading = false;

  constructor(
    private quotationService: SalesQuotationService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.quotationService.getAllSalesQuotations().subscribe({
      next: (resp: any) => {
        this.quotations = resp?.payLoad;
        this.cdr.markForCheck();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      },
    });
  }

  openAdd(): void {
    const ref = this.dialog.open(SalesQuotationDialog, {
      width: '950px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(SalesQuotationView, {
      width: '700px',
      maxWidth: '95vw',
      data: item,
    });
  }

  cancel(item: any): void {
    this.isLoading = true;
    this.quotationService.cancelSalesQuotation(item.id).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.snackBar.success(res?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close')
      }
    });
  }

  convert(item: any): void {
    this.isLoading = true;
    this.quotationService.convertToSalesOrder(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackBar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      }
    });
  }
}
