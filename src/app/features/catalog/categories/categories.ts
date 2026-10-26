import { Component } from '@angular/core';
import { CategoryDialog } from '../../../shared/dialogs/category-dialog/category-dialog';
import { Snackbar } from '../../../core/services/snackbar';
import { Category } from '../../../core/services/category';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-categories',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {

  categories: any[] = [];
  displayedColumns = ['id', 'name', 'status', 'createdAt', 'actions'];
  isLoading = false;

  constructor(
    private categoryService: Category,
    private dialog: MatDialog,
    private snackBar: Snackbar
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    //this.isLoading = true;
    this.categoryService.getAll().subscribe({
      next: (res: any) => {
        this.categories = res?.payLoad;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackBar.danger(err.message, 'Close');
      },
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialog, {
      width: '500px',
      maxWidth: '95vw',
      data: { mode: 'add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadCategories();
    });
  }

  openEditDialog(category: any): void {
    const dialogRef = this.dialog.open(CategoryDialog, {
      width: '500px',
      maxWidth: '95vw',
      data: { mode: 'edit', category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadCategories();
    });
  }

  openViewDialog(category: any): void {
    this.dialog.open(CategoryDialog, {
      width: '450px',
      maxWidth: '95vw',
      data: category,
    });
  }

  toggleStatus(category: any): void {
    const newStatus = category.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.categoryService.updateStatus(category.id, newStatus).subscribe({
      next: (resp: any) => {
        this.snackBar.success(resp?.message, 'Close');
        this.loadCategories();
      },
      error: (err: any) => this.snackBar.danger(err?.message, 'Close'),
    });
  }
}
