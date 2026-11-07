import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StockInService } from '../../../core/services/stock-in-service';
import { Snackbar } from '../../../core/services/snackbar';
import { StockinDialog } from '../../../shared/dialogs/stockin-dialog/stockin-dialog';
import { StockinView } from '../../../shared/dialogs/stockin-view/stockin-view';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-stock-in',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatNativeDateModule
  ],
  templateUrl: './stock-in.html',
  styleUrl: './stock-in.scss',
})
export class StockIn {

  stockIns: any[] = [];
  displayedColumns = ['stockInNo', 'supplier', 'date', 'totalExpense', 'approvalStatus', 'actions'];
  isLoading = false;

  constructor(
    private stockInService: StockInService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.stockInService.getAllStockIns().subscribe({
      next: (resp: any) => {
        this.stockIns = resp?.payLoad;
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
    const ref = this.dialog.open(StockinDialog, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(StockinView, {
      width: '700px',
      maxWidth: '95vw',
      data: item,
    });
  }

  approve(item: any): void {
    this.isLoading = true;
    this.stockInService.approveStockIn(item.id).subscribe({
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

  reject(item: any): void {
    this.stockInService.rejectStockIn(item.id).subscribe({
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
