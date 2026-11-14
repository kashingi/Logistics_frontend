import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Snackbar } from '../../../core/services/snackbar';
import { SalesOrderService } from '../../../core/services/sales-order-service';
import { SalesOrderDialog } from '../../../shared/dialogs/sales-order-dialog/sales-order-dialog';
import { SalesOrderView } from '../../../shared/dialogs/sales-order-view/sales-order-view';

@Component({
  selector: 'app-pending-orders',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  templateUrl: './pending-orders.html',
  styleUrl: './pending-orders.scss',
})
export class PendingOrders {

  orders: any[] = [];
  displayedColumns = ['soNumber', 'customer', 'date', 'totalAmount', 'status', 'actions'];
  isLoading = false;

  constructor(
    private orderService: SalesOrderService,
    private dialog: MatDialog,
    private snackbar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.orderService.getPendingSalesOder().subscribe({
      next: (resp: any) => {
        this.orders = resp?.payLoad;
        this.cdr.markForCheck();
        this.isLoading = false;
      },
      error: (err: any) => {
        // fallback: all orders filtered client-side
        this.orderService.getAllSalesOrders().subscribe({
          next: (res: any) => {
            const all = res?.payLoad;
            this.orders = all.filter((o: any) =>
              ['PENDING', 'DRAFT', 'PROCESSING'].includes((o.status || '').toUpperCase())
            );
            this.isLoading = false;
          },
          error: (err: any) => {
            this.isLoading = false;
            this.snackbar.danger(err?.error?.message, 'Close');
          },
        });
      },
    });
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
        this.snackbar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close')
      }
    });
  }

  dispatch(item: any, type: string): void {
    this.isLoading = true;
    this.orderService.moveSalesOrderToDispatch(item.id, type).subscribe({
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

  collection(item: any): void {
    this.isLoading = true;
    this.orderService.moveSalesOrderToCollection(item.id).subscribe({
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

  cancel(item: any): void {
    this.isLoading = true;
    this.orderService.cancelSalesOrder(item.id).subscribe({
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
