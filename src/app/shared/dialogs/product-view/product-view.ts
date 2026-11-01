import { NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-product-view',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    NgClass,
    MatDivider
  ],
  templateUrl: './product-view.html',
  styleUrl: './product-view.scss',
})
export class ProductView {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
