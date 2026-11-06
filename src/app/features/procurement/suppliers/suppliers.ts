import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SupplierService } from '../../../core/services/supplier-service';
import { Snackbar } from '../../../core/services/snackbar';
import { SuppliersDialog } from '../../../shared/dialogs/suppliers-dialog/suppliers-dialog';
import { SuppliersView } from '../../../shared/dialogs/suppliers-view/suppliers-view';

@Component({
  selector: 'app-suppliers',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.scss',
})
export class Suppliers {

  suppliers: any[] = [];
  displayedColumns = ['supplierNo', 'name', 'city', 'phone', 'status', 'contactPerson', 'street', 'actions'];
  isLoading = false;

  constructor(
    private supplierService: SupplierService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.supplierService.getAll().subscribe({
      next: (resp: any) => {
        this.suppliers = resp?.payLoad;
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
    const ref = this.dialog.open(SuppliersDialog, {
      width: '650px',
      maxWidth: '95vw',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openEdit(item: any): void {
    const ref = this.dialog.open(SuppliersDialog, {
      width: '650px',
      maxWidth: '95vw',
      data: { mode: 'edit', supplier: item },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(SuppliersView, {
      width: '500px',
      maxWidth: '95vw',
      data: item,
    });
  }

  toggleStatus(item: any): void {
    this.isLoading = true;
    const status = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.supplierService.updateStatus(item.id, status).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.snackBar.success(res?.message, 'Close');
        this.loadData();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      }
    });
  }
}
