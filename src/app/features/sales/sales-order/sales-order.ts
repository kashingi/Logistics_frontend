import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SalesOrderService } from '../../../core/services/sales-order-service';
import { Snackbar } from '../../../core/services/snackbar';
import { SalesOrderDialog } from '../../../shared/dialogs/sales-order-dialog/sales-order-dialog';
import { SalesOrderView } from '../../../shared/dialogs/sales-order-view/sales-order-view';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-sales-order',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatNativeDateModule
  ],
  templateUrl: './sales-order.html',
  styleUrl: './sales-order.scss',
})
export class SalesOrder {

  orders: any[] = [];
  displayedColumns = ['soNumber', 'customer', 'date', 'totalAmount', 'status', 'actions'];
  isLoading = false;

  constructor(
    private orderService: SalesOrderService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.orderService.getAllSalesOrders().subscribe({
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
    const ref = this.dialog.open(SalesOrderDialog, {
      width: '950px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(SalesOrderView, {
      width: '700px',
      maxWidth: '95vw',
      data: item,
    });
  }

  confirm(item: any): void {
    this.isLoading = true;
    this.orderService.confirmSalesOrder(item.id).subscribe({
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

  dispatch(item: any, type: string): void {
    this.isLoading = true;
    this.orderService.moveSalesOrderToDispatch(item.id, type).subscribe({
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

  collection(item: any): void {
    this.isLoading = true;
    this.orderService.moveSalesOrderToCollection(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackBar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false
        this.snackBar.danger(err?.error?.message, 'Close')
      }
    });
  }

  cancel(item: any): void {
    2
    this.isLoading = true;
    this.orderService.cancelSalesOrder(item.id).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackBar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message || 'Failed', 'Close')
      }
    });
  }
}
