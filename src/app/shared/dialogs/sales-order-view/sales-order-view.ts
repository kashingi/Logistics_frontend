import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-sales-order-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDivider
],
  templateUrl: './sales-order-view.html',
  styleUrl: './sales-order-view.scss',
})
export class SalesOrderView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
