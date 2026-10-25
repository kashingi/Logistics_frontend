import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Snackbar } from '../../../core/services/snackbar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthWelcomePanel } from '../auth-welcome-panel/auth-welcome-panel';

@Component({
  selector: 'app-verify-email',
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    AuthWelcomePanel,
  ],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail {

  isLoading = true;
  message = '';
  isSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private authService: Auth,
    private router: Router,
    private snackbar: Snackbar
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.isLoading = false;
      this.snackbar.danger('Invalid verification link.', 'Close');
      return;
    }

    this.authService.verifyEmail(token).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        console.log("Verification response : ", resp);
        this.snackbar.success(resp?.message, 'Close');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.isLoading = false;
        console.log("Verification failed:", err);
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }
}
