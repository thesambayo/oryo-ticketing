import { CommonModule } from '@angular/common';
import {
	Component,
	inject,
} from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { StaffLoginPayload } from '../model/login-item';
import { HlmSpinnerComponent } from '../../libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';

@Component({
	selector: 'oryo-login',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, HlmSpinnerComponent],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	_router = inject(Router);
	_activatedRoute = inject(ActivatedRoute);
	_loginService = inject(LoginService);

	returnUrl: string = this._activatedRoute.snapshot.queryParams['returnUrl'] || '/';
	isLoggingIn: boolean = false;
	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required),
	});

	onSubmit() {
		const payload: StaffLoginPayload = {
			email: this.loginForm.value.email!,
			password: this.loginForm.value.password!,
		};
		this._loginService.login(payload).subscribe({
			next: (_res) => {
				this.isLoggingIn = false;
				this._router.navigateByUrl(this.returnUrl);
			},
			error: () => {
				this.isLoggingIn = false;
			}
		});
	}
}
