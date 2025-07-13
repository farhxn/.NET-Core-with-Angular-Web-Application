import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe,RouterLink],
  templateUrl: './registration.component.html',
  styles: `
  
  `,
})
export class RegistrationComponent implements OnInit {
  form: any;
  isSubmit: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService
  ) {}

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value != confirmPassword.value
    ) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/(?=.*[^a-zA-Z0-9])/),
          ],
        ],
        confirmPassword: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.service.createUser(this.form.value).subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            this.toastr.success(
              'Registered Successfully!!',
              'Congratulations ' + this.form.get('fullName')?.value
            );

            this.form.reset();
            this.isSubmit = false;
          }
          console.log(res);
        },
        error: (err) => {
          if (err.error.errors) {
            err.error.errors.forEach((x: any) => {
              switch (x.code) {
                case 'DuplicateEmail':
                  this.toastr.error(
                    'Email is already taken !!',
                    'Registration Failed'
                  );
                  break;
                case 'DuplicateUserName':
                  break;
                default:
                  this.toastr.error('Error Occured while Saving!!', 'Error');
                  console.log(x);
                  break;
              }
            });
          }
          console.log(err);
        },
      });
      console.log(this.form.value);
    }
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmit || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }
}
