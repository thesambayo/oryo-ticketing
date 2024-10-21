import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	FormGroup,
	FormControl,
	Validators,
	FormsModule,
	ReactiveFormsModule,
	AbstractControl,
	ValidationErrors,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HlmSpinnerComponent } from "@spartan-ng/ui-spinner-helm";
import { StaffRestPayload } from "../../models/login-item";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "oryo-password-rest",
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, HlmSpinnerComponent],
	templateUrl: "./password-rest.component.html",
	styleUrl: "./password-rest.component.css",
})
export class PasswordRestComponent {
	_router = inject(Router);
	_authService = inject(AuthService);

	// Custom validator function to check if passwords match
	passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
		const formGroup = control as FormGroup;
		const newPassword = formGroup.get("newPassword")?.value;
		const confirmPassword = formGroup.get("confirmPassword")?.value;

		if (newPassword !== confirmPassword) {
			return { passwordsDoNotMatch: true };
		}

		return null;
	}

	isLoggingIn = false;

	loginForm = new FormGroup(
		{
			currentPassword: new FormControl("", Validators.required),
			newPassword: new FormControl("", Validators.required),
			confirmPassword: new FormControl("", Validators.required),
		},
		{ validators: this.passwordMatchValidator }
	);

	onSubmit() {
		const payload: StaffRestPayload = {
			currentPassword: this.loginForm.value.currentPassword!,
			newPassword: this.loginForm.value.newPassword!,
		};
		// this._loginService.login(payload).subscribe({
		// 	next: (res) => {
		// 		this.isLoggingIn = false;
		// 		this._router.navigate(['/']);
		// 	},
		// 	error: (err) => {
		// 		console.log(err);
		// 	}
		// });
	}
}
