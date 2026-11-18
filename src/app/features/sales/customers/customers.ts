import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomerService } from '../../../core/services/customer-service';
import { Snackbar } from '../../../core/services/snackbar';
import { CustomerDialog } from '../../../shared/dialogs/customer-dialog/customer-dialog';
import { CustomerView } from '../../../shared/dialogs/customer-view/customer-view';

@Component({
  selector: 'app-customers',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {

  customers: any[] = [];
  displayedColumns = ['customerNo', 'name', 'phone', 'email', 'status', 'actions'];
  isLoading = false;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackbar: Snackbar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.customerService.getAllCustomers().subscribe({
      next: (resp: any) => {
        this.customers = resp?.payLoad;
        this.cdr.markForCheck();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message , 'Close');
      },
    });
  }

  openAdd(): void {
    const ref = this.dialog.open(CustomerDialog, {
      width: '650px',
      maxWidth: '95vw',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openEdit(item: any): void {
    const ref = this.dialog.open(CustomerDialog, {
      width: '650px',
      maxWidth: '95vw',
      data: { mode: 'edit', customer: item },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(CustomerView, {
      width: '500px',
      maxWidth: '95vw',
      data: item,
    });
  }

  toggleStatus(item: any): void {
    this.isLoading = true;
    const status = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.customerService.updateStatus(item.id, status).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close')},
    });
  }
}
