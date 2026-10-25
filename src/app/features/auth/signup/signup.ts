import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

  signupForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth,
    private router: Router,
    private snackbar: Snackbar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    this.isLoading = true;
    const signupData = {
      fullName: this.signupForm.value.fullName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    }

    this.authService.signup(signupData).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        console.log("signup response : ", resp);
        this.snackbar.success(resp.message, "Close");
        this.router.navigate(['/']);
        this.signupForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        this.snackbar.danger(err?.error?.message, "Close");
      },
    });
  }
}
