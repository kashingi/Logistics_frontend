import { ChangeDetectorRef, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CategoryDialog } from '../../../shared/dialogs/category-dialog/category-dialog';
import { Snackbar } from '../../../core/services/snackbar';
import { Category as CategoryService } from '../../../core/services/category';
import { Category } from '../../../core/models/category';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDivider } from '@angular/material/divider';


@Component({
  selector: 'app-categories',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatTooltipModule,
    MatDivider
],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {

  private cdr = inject(ChangeDetectorRef);

  categories: Category[] = [];
  displayedColumns = ['id', 'name', 'status', 'createdAt', 'updatedAt', 'actions'];
  isLoading = false;

  @ViewChild('viewCategoryTemplate')
  viewCategoryTemplate!: TemplateRef<any>;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: Snackbar
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getAll().subscribe({
      next: (resp: any) => {
        this.categories = resp?.payLoad;
        this.isLoading = false;
        this.cdr.markForCheck();
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

  openEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(CategoryDialog, {
      width: '500px',
      maxWidth: '95vw',
      data: { mode: 'edit', category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadCategories();
    });
  }

  openViewDialog(category: Category): void {
    this.dialog.open(this.viewCategoryTemplate, {
      width: '500px',
      maxWidth: '95vw',
      data: category
    });
  }

  toggleStatus(category: Category): void {
    if (category.id === undefined) {
      this.snackBar.danger('Unable to update category without an ID.', 'Close');
      return;
    }
    const categoryId = category.id;
    const newStatus = category.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.categoryService.updateStatus(categoryId, newStatus).subscribe({
      next: (resp: any) => {
        this.snackBar.success(resp?.message, 'Close');
        this.loadCategories();
      },
      error: (err: any) => this.snackBar.danger(err?.message, 'Close'),
    });
  }
}
