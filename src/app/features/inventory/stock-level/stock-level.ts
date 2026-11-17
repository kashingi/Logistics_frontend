import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StockLevelService } from '../../../core/services/stock-level-service';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-stock-level',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './stock-level.html',
  styleUrl: './stock-level.scss',
})
export class StockLevel {

  levels: any[] = [];
  filtered: any[] = [];
  warehouses: any[] = [];
  displayedColumns = ['product', 'sku', 'warehouse', 'batch', 'onHand', 'status'];
  isLoading = false;

  selectedWarehouseId: number | null = null;
  searchText = '';
  lowStockOnly = false;
  threshold = 10;

  constructor(
    private stockService: StockLevelService,
    private warehouseService: WarehouseService,
    private snackbar: Snackbar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadWarehouses();
    this.loadData();
  }

  loadWarehouses(): void {
    this.warehouseService.getAll().subscribe({
      next: (resp: any) => {
        this.warehouses = resp?.payLoad;
      },
      error: (err: any) => {
        this.snackbar.danger(err?.error?.message, 'Close')
      }
    });
  }

  loadData(): void {
    this.isLoading = true;
    const req$ = this.selectedWarehouseId
      ? this.stockService.getStockByWarehouse(this.selectedWarehouseId)
      : this.stockService.getAllStockLevels();

    req$.subscribe({
      next: (resp: any) => {
        this.levels = resp?.payLoad;
        this.cdr.markForCheck();
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }

  applyFilters(): void {
    let data = [...this.levels];

    if (this.searchText.trim()) {
      const q = this.searchText.toLowerCase();
      data = data.filter(
        (r) =>
          r.product?.name?.toLowerCase().includes(q) ||
          r.product?.skuCode?.toLowerCase().includes(q) ||
          r.batch?.lotNumber?.toLowerCase().includes(q)
      );
    }

    if (this.lowStockOnly) {
      data = data.filter(
        (r) => Number(r.quantityOnHand ?? 0) < this.threshold
      );
    }

    this.filtered = data;
  }

  onFilterChange(): void {
    this.loadData();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  isLow(row: any): boolean {
    return Number(row.quantityOnHand ?? 0) < this.threshold;
  }
}
