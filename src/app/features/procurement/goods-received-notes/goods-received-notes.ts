import { ChangeDetectorRef, Component } from '@angular/core';
import { GrnView } from '../../../shared/dialogs/grn-view/grn-view';
import { GrnDialog } from '../../../shared/dialogs/grn-dialog/grn-dialog';
import { GrnService } from '../../../core/services/grn-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Snackbar } from '../../../core/services/snackbar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-goods-received-notes',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './goods-received-notes.html',
  styleUrl: './goods-received-notes.scss',
})
export class GoodsReceivedNotes {

  grns: any[] = [];
  displayedColumns = ['grnNumber', 'supplier', 'receivedDate', 'totalAmount', 'status', 'actions'];
  isLoading = false;

  constructor(
    private grnService: GrnService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.grnService.getAllGRNs().subscribe({
      next: (res: any) => {
        this.grns = res?.payLoad;
        this.cdr.markForCheck();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      },
    });
  }

  openAdd(): void {
    const ref = this.dialog.open(GrnDialog, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { mode: 'add' },
    });
    ref.afterClosed().subscribe((r) => r && this.loadData());
  }

  openView(item: any): void {
    this.dialog.open(GrnView, {
      width: '700px',
      maxWidth: '95vw',
      data: item,
    });
  }

  approve(item: any): void {
    this.isLoading = true;
    this.grnService.approveGRN(item.id).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.snackBar.success(res?.message, 'Close');
        this.loadData();
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.danger(err?.error?.message, 'Close');
      },
    });
  }
}
