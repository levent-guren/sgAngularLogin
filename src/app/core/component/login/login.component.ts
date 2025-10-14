import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  myForm: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);

  constructor() {
    this.myForm = this.fb.group({
      adi: ['', [Validators.required, Validators.minLength(2)]],
      sifre: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  login() {
    const adi: string = this.myForm.get('adi')!.value;
    const sifre: string = this.myForm.get('sifre')!.value;
    this.authService.login(adi, sifre).subscribe({
      next: (r) => {
        console.log('Giriş yapıldı');
        this.toastr.success('Giriş yapıldı');
        this.router.navigate(['/menu']);
      },
      error: (e) => {
        this.toastr.error('Hata oluştu');
        console.log('Hata oluştu');
      }
    });
  }
}
