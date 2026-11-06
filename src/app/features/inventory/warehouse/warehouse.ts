import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { Snackbar } from '../../../core/services/snackbar';
import { WarehouseDialog } from '../../../shared/dialogs/warehouse-dialog/warehouse-dialog';
import { WarehouseView } from '../../../shared/dialogs/warehouse-view/warehouse-view';

@Component({
  selector: 'app-warehouse',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.scss',
})
export class Warehouse {

  warehouses: any[] = [];
  displayedColumns = ['warehouseNo', 'name', 'city', 'status', 'actions'];
  isLoading = false;
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private warehouseService: WarehouseService,
    private dialog: MatDialog,
    private snackBar: Snackbar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.warehouseService.getAll().subscribe({
      next: (res: any) => {
        this.warehouses = res?.payLoad;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log('Error loading warehouses : ', err);
        this.isLoading = false;
        this.snackBar.danger(err?.message, 'Close');
      },
    });
  }

  openAdd(): void {
    const ref = this.dialog.open(WarehouseDialog, {
      width: '650px',
      maxWidth: '95vw',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openEdit(item: any): void {
    const ref = this.dialog.open(WarehouseDialog, {
      width: '650px',
      maxWidth: '95vw',
      data: { mode: 'edit', warehouse: item },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(WarehouseView, {
      width: '500px',
      maxWidth: '95vw',
      data: item,
    });
  }

  toggleStatus(item: any): void {
    this.isLoading = true;
    const status = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.warehouseService.updateStatus(item.id, status).subscribe({
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
