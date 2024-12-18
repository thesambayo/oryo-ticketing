import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StaffLoginPayload } from "../../models/login-item";
import { HlmSpinnerComponent } from "../../../../shared/ui/ui-spinner-helm/src/lib/hlm-spinner.component";
import { OperationsList } from "./login.constants";
import { HlmIconComponent } from "@spartan-ng/ui-icon-helm";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../../../environments/environment";
import { AuthHttpService } from "../../services/auth-http.service";
import { AuthMockService } from "../../services/auth-mock.service";

@Component({
	selector: "oryo-login",
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, HlmSpinnerComponent, HlmIconComponent],
	providers: [{ provide: AuthService, useClass: environment.useMocks ? AuthMockService : AuthHttpService }],
})
export class LoginComponent {
	readonly _router = inject(Router);
	readonly _fb = inject(FormBuilder);
	readonly _authService = inject(AuthService);
	readonly _activatedRoute = inject(ActivatedRoute);

	readonly operationsList = OperationsList;

	returnUrl: string = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";
	isLoggingIn = false;

	loginForm = this._fb.nonNullable.group({
		email: this._fb.nonNullable.control("", [Validators.required, Validators.email]),
		password: this._fb.nonNullable.control("", Validators.required),
	});

	onSubmit() {
		const payload: StaffLoginPayload = {
			email: this.loginForm.controls.email.value,
			password: this.loginForm.controls.password.value,
		};
		this._authService.login(payload).subscribe({
			next: () => {
				this.isLoggingIn = false;
				this._router.navigateByUrl(this.returnUrl);
			},
			error: () => {
				this.isLoggingIn = false;
			},
		});
	}
}
