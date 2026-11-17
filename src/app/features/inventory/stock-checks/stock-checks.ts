import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StockCheckService } from '../../../core/services/stock-check-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Snackbar } from '../../../core/services/snackbar';
import { StockCheckDialog } from '../../../shared/dialogs/stock-check-dialog/stock-check-dialog';
import { StockCheckView } from '../../../shared/dialogs/stock-check-view/stock-check-view';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-stock-checks',
  imports: [
     CommonModule,
     MatTableModule,
     MatButtonModule,
     MatIconModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './stock-checks.html',
  styleUrl: './stock-checks.scss',
})
export class StockChecks implements OnInit{

  checks: any[] = [];
  displayedColumns = ['stockCheckNo', 'warehouse', 'checkDate', 'status', 'actions'];
  isLoading = false;

  constructor(
    private checkService: StockCheckService,
    private dialog: MatDialog,
    private snackbar: Snackbar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.checkService.getAllStockChecks().subscribe({
      next: (resp: any) => {
        this.checks = resp?.payLoad;
        this.cdr.markForCheck();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }

  openAdd(): void {
    const ref = this.dialog.open(StockCheckDialog, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(StockCheckView, {
      width: '750px',
      maxWidth: '95vw',
      data: item,
    });
  }

  approve(item: any): void {
    this.isLoading = true;
    this.checkService.approveStockCheck(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close')
      },
    });
  }

  cancel(item: any): void {
    this.isLoading = true;
    this.checkService.cancelStockCheck(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close')
      }
    });
  }
}
