import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-warehouse-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './warehouse-view.html',
  styleUrl: './warehouse-view.scss',
})
export class WarehouseView {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}
