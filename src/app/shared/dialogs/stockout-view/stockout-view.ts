import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-stockout-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './stockout-view.html',
  styleUrl: './stockout-view.scss',
})
export class StockoutView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
