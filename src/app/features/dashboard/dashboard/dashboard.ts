import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../../core/services/dashboard-service';
import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-dashboard',
  imports: [
     CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    BaseChartDirective,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  loading = true;
  days = 30;
  data: any = {};

  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } },
  };

  donutData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  donutOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right' } },
    cutout: '68%',
  };

  constructor(
    private dashboardService: DashboardService,
    private snackabar: Snackbar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.dashboardService.getDashboardSummary(this.days).subscribe({
      next: (dashboardData: any) => {
        this.data = dashboardData;
        this.cdr.markForCheck();

        this.lineChartData = {
          labels: dashboardData.salesTrendLabels || [],
          datasets: [
            {
              data: (dashboardData.salesTrendAmounts || []).map((x: any) => Number(x)),
              label: 'Sales (KES)',
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59,130,246,0.12)',
              fill: true,
              tension: 0.35,
            },
            {
              data: (dashboardData.salesTrendOrderCounts || []).map((x: any) => Number(x)),
              label: 'Orders',
              borderColor: '#22c55e',
              backgroundColor: 'rgba(34,197,94,0.10)',
              fill: true,
              tension: 0.35,
            },
          ],
        };

        const status = dashboardData.deliveriesByStatus || {};
        this.donutData = {
          labels: Object.keys(status),
          datasets: [
            {
              data: Object.values(status).map((x: any) => Number(x)),
              backgroundColor: ['#22c55e', '#f59e0b', '#3b82f6'],
              borderWidth: 0,
            },
          ],
        };

        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false,
        this.snackabar.danger(err?.error?.message, 'Close');
      },
    });
  }

  onDaysChange(): void {
    this.loadDashboardData();
  }

  formatMoney(v: any): string {
    const n = Number(v || 0);
    if (n >= 1_000_000) return `KES ${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `KES ${(n / 1_000).toFixed(1)}K`;
    return `KES ${n.toFixed(0)}`;
  }
}
