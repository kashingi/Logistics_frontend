import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Category } from '../../../core/services/category';
import { Snackbar } from '../../../core/services/snackbar';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-category-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './category-dialog.html',
  styleUrl: './category-dialog.scss',
})
export class CategoryDialog {

  form!: FormGroup;
  isLoading = false;
  isEdit = false;

  statuses = [
    { name: 'active', value: 'ACTIVE' },
    { name: 'inactive', value: 'INACTIVE' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: Category,
    private snackbar: Snackbar,
    private dialogRef: MatDialogRef<CategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.mode === 'edit';
    this.form = this.formBuilder.group({
      name: [this.data.category?.name || '', [Validators.required, Validators.minLength(2)]],
      status: [this.data.category?.status || '', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    console.log('Form Value:', this.form.value, this.isEdit);
    const request$ = this.isEdit
      ? this.categoryService.update(this.data.category.id, this.form.value)
      : this.categoryService.create(this.form.value);

    request$.subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, 'Close');
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }
}
