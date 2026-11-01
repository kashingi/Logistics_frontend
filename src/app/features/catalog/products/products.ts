import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Snackbar } from '../../../core/services/snackbar';
import { Product } from '../../../core/services/product';
import { ProductModel } from '../../../core/models/product';
import { ProductDialog } from '../../../shared/dialogs/product-dialog/product-dialog';
import { ProductView } from '../../../shared/dialogs/product-view/product-view';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {

  //private cdr = inject(ChangeDetectorRef);

  products: ProductModel[] = [];

  displayedColumns = [
    'productNo',
    'image',
    'name',
    'skuCode',
    'category',
    'status',
    'actions',
  ];

  isLoading = false;

  constructor(
    private dialog: MatDialog,
    private snackbar: Snackbar,
    private productService: Product,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;

    this.productService.getAll().subscribe({
      next: (resp: any) => {
        this.products = resp?.payLoad ?? [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.message, 'Close');
      },
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProductDialog, {
      width: '500px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'product-dialog-panel',
      data: { mode: 'add' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProducts();
    });
  }

  openEditDialog(product: ProductModel): void {
    console.log("Product Id is : ", product.id);
    const dialogRef = this.dialog.open(ProductDialog, {
      width: '500px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'product-dialog-panel',
      data: { mode: 'edit', product },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProducts();
    });
  }

  openViewDialog(product: ProductModel): void {
    this.dialog.open(ProductView, {
      width: '60vw',
      maxWidth: '95vw',
      data: product
    });
  }
  

  toggleStatus(product: ProductModel): void {
    const productId = product.id;

    if (productId == null) {
      this.snackbar.danger('Unable to update product without an ID.', 'Close');
      return;
    }

    this.isLoading = true;

    const newStatus = product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

    this.productService.updateStatus(productId, newStatus).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, 'Close');
        this.loadProducts();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.message, 'Close');
      }
    });
  }
}
