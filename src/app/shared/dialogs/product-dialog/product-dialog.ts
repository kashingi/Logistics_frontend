import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule  } from '@angular/material/checkbox'
import { Product } from '../../../core/services/product';
import { Category } from '../../../core/services/category';
import { Snackbar } from '../../../core/services/snackbar';
import { MatDivider } from '@angular/material/divider';
import { ProductImage, ProductModel } from '../../../core/models/product';

@Component({
  selector: 'app-product-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDivider
],
  templateUrl: './product-dialog.html',
  styleUrl: './product-dialog.scss',
})
export class ProductDialog {

  productForm!: FormGroup;
  isLoading = false;
  isReadingImages = false;
  isDraggingImages = false;
  isEdit = false;
  categories: any[] = [];
  images: ProductImage[] = [];
  readonly maxImages = 5;

  uomOptions = ['KG', 'GRAM', 'LITRE', 'PIECE', 'BOX', 'CARTON'];
  packagingOptions = ['BAG', 'BOTTLE', 'BUNDLE', 'BASKET', 'BOX', 'CARTON', 'PIECE', 'LITRE'];
  taxRateOptions = ['EXEMPT', 'STANDARD_16', 'ZERO_RATED_0', 'NON_VAT', 'REDUCED_8'];
  statusOptions = ['ACTIVE', 'INACTIVE'];

  constructor(
    private formbuilder: FormBuilder,
    private productService: Product,
    private categoryService: Category,
    private cdr: ChangeDetectorRef,
    private snackbar: Snackbar,
    private dialogRef: MatDialogRef<ProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data?.mode === 'edit';
    this.loadCategories();

    const product = this.data?.product || {};
    this.images = Array.isArray(product.images) ? [...product.images] : [];

    this.productForm = this.formbuilder.group({
      name: [product.name || '', Validators.required],
      skuCode: [product.skuCode || '', Validators.required],
      serialNumber: [product.serialNumber || ''],
      brand: [product.brand || ''],
      description: [product.description || ''],
      categoryId: [product.category?.id || product.categoryId || null, Validators.required],
      uom: [product.uom || ''],
      packagingUnit: [product.packagingUnit || ''],
      quantityPerUnit: [product.quantityPerUnit || null],
      purchasePrice: [product.purchasePrice || null],
      wholesalePrice: [product.wholesalePrice || null],
      retailPrice: [product.retailPrice || null],
      salesTaxRate: [product.salesTaxRate || ''],
      purchaseTaxRate: [product.purchaseTaxRate || ''],
      batchManaged: [product.batchManaged || false],
      shelfLifeDays: [product.shelfLifeDays || null],
      earlyWarningDays: [product.earlyWarningDays || null],
      status: [product.status || null],
    });
  }

  onImageInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      void this.addImages(Array.from(input.files));
    }
    input.value = '';
  }

  onImageDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingImages = true;
  }

  onImageDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingImages = false;
  }

  onImageDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingImages = false;
    if (event.dataTransfer?.files) {
      void this.addImages(Array.from(event.dataTransfer.files));
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  private async addImages(files: File[]): Promise<void> {
    if (this.isReadingImages || files.length === 0) {
      return;
    }

    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      this.snackbar.danger('Only image files can be uploaded.', 'Close');
    }
    if (imageFiles.length === 0) {
      return;
    }
    if (this.images.length + imageFiles.length > this.maxImages) {
      this.snackbar.danger(`You can add a maximum of ${this.maxImages} images.`, 'Close');
      return;
    }

    this.isReadingImages = true;
    try {
      const newImages = await Promise.all(
        imageFiles.map(file => this.readImage(file))
      );
      this.images.push(...newImages);
    } catch {
      this.snackbar.danger('Unable to read one or more selected images.', 'Close');
    } finally {
      this.isReadingImages = false;
      this.cdr.markForCheck();
    }
  }

  private readImage(file: File): Promise<ProductImage> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve({ productImage: reader.result });
        } else {
          reject(new Error(`Unable to read ${file.name}.`));
        }
      };
      reader.onerror = () => reject(reader.error ?? new Error(`Unable to read ${file.name}.`));
      reader.readAsDataURL(file);
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (res: any) => {
        this.categories = res?.payLoad;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.snackbar.danger(err?.message, "Close")
      }
    });
  }

  onSubmit(): void {

    this.isLoading = true;
    const payload: ProductModel = {
      ...this.productForm.value,
      images: this.images,
    };
    const productId = this.isEdit ? this.data?.product?.id : null;
    console.log(payload, productId);

    const request$ = this.isEdit
      ? this.productService.update(this.data.product.id, payload)
      : this.productService.create(payload);

    request$.subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.snackbar.success(resp?.message, "Close");
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.log("Error occurred : ", err);
        this.isLoading = false;
        this.snackbar.danger(err?.message, "Close");
      },
    });
  }
}
