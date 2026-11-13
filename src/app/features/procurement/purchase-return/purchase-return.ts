import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PurchaseReturnService } from '../../../core/services/purchase-return-service';
import { Snackbar } from '../../../core/services/snackbar';
import { PurchaseReturnDialog } from '../../../shared/dialogs/purchase-return-dialog/purchase-return-dialog';
import { PurchaseReturnView } from '../../../shared/dialogs/purchase-return-view/purchase-return-view';

@Component({
  selector: 'app-purchase-return',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './purchase-return.html',
  styleUrl: './purchase-return.scss',
})
export class PurchaseReturn {

  returns: any[] = [];
  displayedColumns = ['returnNo', 'supplier', 'returnDate', 'totalAmount', 'status', 'actions'];
  isLoading = false;

  constructor(
    private returnService: PurchaseReturnService,
    private dialog: MatDialog,
    private snackbar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.returnService.getAllPurchaseReturns().subscribe({
      next: (resp: any) => {
        this.returns = resp?.payLoad;
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
    const ref = this.dialog.open(PurchaseReturnDialog, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(PurchaseReturnView, {
      width: '85vw',
      maxWidth: '95vw',
      data: item,
    });
  }

  approve(item: any): void {
    this.isLoading = true;
    this.returnService.approvePurchaseReturn(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close')
      }
    });
  }

  reject(item: any): void {
    this.isLoading = true;
    this.returnService.rejectPurchaseReturn(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close')
      }
    });
  }
}
