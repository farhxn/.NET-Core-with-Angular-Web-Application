import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  form: any;
  isSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.service.signin(this.form.value).subscribe({
        next: (res: any) => {
          this.service.saveToken(res.token);
          this.route.navigateByUrl('/dashboard');
          this.toastr.success('Sign In Successfully', 'Congratulations!!');
        },
        error: (err) => {
          console.log(err);
          if (err.status == 400) {
            this.toastr.error('Incorrect Credentials', 'Error!!!');
          } else this.toastr.error(err, 'Error Occured');
        },
      });
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
