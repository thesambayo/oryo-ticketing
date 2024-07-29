import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  viewChildren,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginPayload } from '../model/login-item';
import { HlmSpinnerComponent } from '../../libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';

@Component({
  selector: 'oryo-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HlmSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  _authService = inject(AuthService);
  _router= inject(Router);

  spinner: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    const payload: LoginPayload = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    // this._authService.login(payload).subscribe((res) => {
    //   this._authService.saveUser(res.data);
    // });
    this.spinner = true;
    // Simulate API call
    setTimeout(() => {
      this.spinner = false;
      console.log(payload);
      this._router.navigate(['/']);
    }, 2000);
  }
}
