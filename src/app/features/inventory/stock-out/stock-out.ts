import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StockOutService } from '../../../core/services/stock-out-service';
import { Snackbar } from '../../../core/services/snackbar';
import { StockoutDialog } from '../../../shared/dialogs/stockout-dialog/stockout-dialog';
import { StockoutView } from '../../../shared/dialogs/stockout-view/stockout-view';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-stock-out',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatNativeDateModule,
  ],
  templateUrl: './stock-out.html',
  styleUrl: './stock-out.scss',
})
export class StockOut {

  stockOuts: any[] = [];
  displayedColumns = ['stockOutNo', 'date', 'stockOutReason', 'approvalStatus', 'actions'];
  isLoading = false;

  constructor(
    private stockOutService: StockOutService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.stockOutService.getAllStockOuts().subscribe({
      next: (resp: any) => {
        this.stockOuts = resp?.payLoad;
        this.cdr.detectChanges();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      },
    });
  }

  openAdd(): void {
    const ref = this.dialog.open(StockoutDialog, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(StockoutView, {
      width: '700px',
      maxWidth: '95vw',
      data: item,
    });
  }

  approve(item: any): void {
    this.isLoading = true;
    this.stockOutService.approveStockOut(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackBar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close')
      }
    });
  }

  reject(item: any): void {
    this.isLoading = true;
    this.stockOutService.rejectStockOut(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackBar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close')
      }
    });
  }
}
