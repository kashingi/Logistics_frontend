import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-stock-check-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDivider
],
  templateUrl: './stock-check-view.html',
  styleUrl: './stock-check-view.scss',
})
export class StockCheckView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
