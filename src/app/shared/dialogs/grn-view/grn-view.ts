import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-grn-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './grn-view.html',
  styleUrl: './grn-view.scss',
})
export class GrnView {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
