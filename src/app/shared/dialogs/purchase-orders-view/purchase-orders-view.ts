import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-purchase-orders-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatDivider
],
  templateUrl: './purchase-orders-view.html',
  styleUrl: './purchase-orders-view.scss',
})
export class PurchaseOrdersView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
