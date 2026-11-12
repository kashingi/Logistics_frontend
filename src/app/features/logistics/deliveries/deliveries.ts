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
import { Snackbar } from '../../../core/services/snackbar';
import { DeliveryView } from '../../../shared/dialogs/delivery-view/delivery-view';

@Component({
  selector: 'app-deliveries',
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
  templateUrl: './deliveries.html',
  styleUrl: './deliveries.scss',
})
export class Deliveries {

  deliveries: any[] = [];
  displayedColumns = [
    'id',
    'soNumber',
    'customer',
    'deliveryType',
    'rider',
    'status',
    'actions',
  ];
  isLoading = false;

  selectedType = '';
  selectedStatus = '';

  typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'STANDARD', label: 'Standard' },
    { value: 'EXPRESS', label: 'Express' },
    { value: 'COLLECTION', label: 'Collection' },
  ];

  statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'PICKED', label: 'Picked' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'COLLECTED', label: 'Collected' },
    { value: 'CANCELLED', label: 'Cancelled' },
    { value: 'RETURNED', label: 'Returned' },
  ];

  constructor(
    private deliveryService: DeliveryService,
    private dialog: MatDialog,
    private snackbar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.deliveryService.getAllDeliveries(this.selectedType || undefined, this.selectedStatus || undefined).subscribe({
      next: (resp: any) => {
        this.deliveries = resp?.payLoad;
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

  openView(item: any): void {
    this.dialog.open(DeliveryView, {
      width: '650px',
      maxWidth: '95vw',
      data: item,
    });
  }

  markPicked(item: any): void {
    this.isLoading = true;
    this.deliveryService.markPicked(item.id).subscribe({
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

  markCollected(item: any): void {
    this.isLoading = true;
    this.deliveryService.markCollected(item.id).subscribe({
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

  complete(item: any): void {
    this.isLoading = true;
    this.deliveryService.completeDelivery(item.id).subscribe({
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

    const reason = prompt('Cancel reason:');
    if (reason === null) return;

    const action =
      prompt(
        'Action: RETURN_TO_PENDING or CHARGE_CUSTOMER',
        'RETURN_TO_PENDING'
      ) || 'RETURN_TO_PENDING';
    this.isLoading = true;
    this.deliveryService.cancelDelivery(item.id, reason, action).subscribe({
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

  returnDelivery(item: any): void {
    const reason = prompt('Return reason:');
    if (reason === null) return;

    const action =
      prompt(
        'Action: REPLACE_DELIVERY or ISSUE_CREDIT_NOTE',
        'ISSUE_CREDIT_NOTE'
      ) || 'ISSUE_CREDIT_NOTE';
    this.isLoading = true;
    this.deliveryService.returnDelivery(item.id, reason, action).subscribe({
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
