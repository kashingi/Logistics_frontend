import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StockTransferService } from '../../../core/services/stock-transfer-service';
import { Snackbar } from '../../../core/services/snackbar';
import { StockTransferDialog } from '../../../shared/dialogs/stock-transfer-dialog/stock-transfer-dialog';
import { StockTransferView } from '../../../shared/dialogs/stock-transfer-view/stock-transfer-view';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-stock-transfer',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatNativeDateModule,
  ],
  templateUrl: './stock-transfer.html',
  styleUrl: './stock-transfer.scss',
})
export class StockTransfer {

  transfers: any[] = [];
  displayedColumns = ['transferNo', 'source', 'destination', 'date', 'totalQuantity', 'status', 'actions'];
  isLoading = false;

  constructor(
    private transferService: StockTransferService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.transferService.getAllStockTransfers().subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.transfers = resp?.payLoad;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      },
    });
  }

  openAdd(): void {
    const ref = this.dialog.open(StockTransferDialog, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(StockTransferView, {
      width: '700px',
      maxWidth: '95vw',
      data: item,
    });
  }

  approve(item: any): void {
    this.isLoading = true;
    this.transferService.approveStockTransfer(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackBar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      },
    });
  }

  receive(item: any): void {
    this.transferService.receiveStockTransfer(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackBar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      },
    });
  }

  cancel(item: any): void {
    this.isLoading = true;
    this.transferService.cancelStockTransfer(item.id).subscribe({
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
