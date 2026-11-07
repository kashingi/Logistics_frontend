import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PurchaseOrderService } from '../../../core/services/purchase-order-service';
import { Snackbar } from '../../../core/services/snackbar';
import { PurchaseOrdersDialog } from '../../../shared/dialogs/purchase-orders-dialog/purchase-orders-dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PurchaseOrdersView } from '../../../shared/dialogs/purchase-orders-view/purchase-orders-view';

@Component({
  selector: 'app-purchase-orders',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './purchase-orders.html',
  styleUrl: './purchase-orders.scss',
})
export class PurchaseOrders {

  orders: any[] = [];
  displayedColumns = ['poNumber', 'supplier', 'orderDate', 'totalAmount', 'status', 'actions'];
  isLoading = false;

  constructor(
    private poService: PurchaseOrderService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.poService.getAllPOs().subscribe({
      next: (resp: any) => {
        this.orders = resp?.payLoad;
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
    const ref = this.dialog.open(PurchaseOrdersDialog, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(PurchaseOrdersView, {
      width: '700px',
      maxWidth: '95vw',
      data: item,
    });
  }

  approve(item: any): void {
    this.isLoading = true;
    this.poService.approvePO(item.id).subscribe({
      next: (resp: any) => {
        console.log('Approve response:', resp);
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
    this.poService.rejectPO(item.id).subscribe({
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
