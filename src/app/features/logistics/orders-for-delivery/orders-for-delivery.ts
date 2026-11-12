import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeliveryService } from '../../../core/services/delivery-service';
import { RiderService } from '../../../core/services/rider-service';
import { Snackbar } from '../../../core/services/snackbar';
import { SalesOrderView } from '../../../shared/dialogs/sales-order-view/sales-order-view';
import { AssignRiderDialog } from '../../../shared/dialogs/assign-rider-dialog/assign-rider-dialog';

@Component({
  selector: 'app-orders-for-delivery',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  templateUrl: './orders-for-delivery.html',
  styleUrl: './orders-for-delivery.scss',
})
export class OrdersForDelivery {

  orders: any[] = [];
  displayedColumns = [
    'soNumber',
    'customer',
    'dispatchType',
    'totalAmount',
    'status',
    'actions',
  ];
  isLoading = false;
  selectedDispatchType = '';

  dispatchTypes = [
    { value: '', label: 'All' },
    { value: 'STANDARD', label: 'Standard' },
    { value: 'EXPRESS', label: 'Express' },
    { value: 'COLLECTION', label: 'Collection' },
  ];

  constructor(
    private deliveryService: DeliveryService,
    private riderService: RiderService,
    private dialog: MatDialog,
    private snackbar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.deliveryService.getOrdersForDelivery(this.selectedDispatchType || undefined).subscribe({
      next: (resp: any) => {
        this.orders = resp?.payLoad;
        this.cdr.markForCheck();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close');
      }
    });
  }

  onFilterChange(): void {
    this.loadData();
  }

  openView(order: any): void {
    this.dialog.open(SalesOrderView, {
      width: '700px',
      maxWidth: '95vw',
      data: order,
    });
  }

  openAssignRider(order: any): void {
    const dialogref = this.dialog.open(AssignRiderDialog, {
      width: '420px',
      maxWidth: '95vw',
      data: { salesOrderId: order.id, order },
    });
    dialogref.afterClosed().subscribe((r) => r && this.loadData());
  }

  allocateLot(order: any): void {
    this.isLoading = true;
    this.deliveryService.allocateLot(order.id).subscribe({
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

  scanItem(order: any): void {
    this.isLoading = true;
    const barcode = prompt('Enter / scan barcode: ');
    if (!barcode) return;

    this.deliveryService.scanItem(order.id, barcode.trim()).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, 'Close');
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close');
      }
    });
  }
}
