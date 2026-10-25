import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Snackbar } from '../../../core/services/snackbar';
import { AuthWelcomePanel } from '../auth-welcome-panel/auth-welcome-panel';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AuthWelcomePanel,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  

  resetPasswordForm!: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth,
    private router: Router,
    private snackbar: Snackbar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {

    this.isLoading = true;
    const resetData = {
      newPassword: this.resetPasswordForm.value.newPassword,
      token: this.route.snapshot.queryParamMap.get('token'),
    };

    this.authService.resetPassword(resetData).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        console.log('Password reset successfully:', resp);
        this.snackbar.success(resp?.message, 'Close');
        this.router.navigate(['/']);
        this.resetPasswordForm.reset();
      },
      error: (err: any) => {
        this.isLoading = false;
        console.log("Error occured : ", err);
        this.snackbar.danger(err?.error?.message, 'Close');
      },
    });
  }
}
