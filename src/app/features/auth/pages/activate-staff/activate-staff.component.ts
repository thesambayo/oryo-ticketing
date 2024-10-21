import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { toast } from "ngx-sonner";
import { HlmSpinnerComponent } from "@spartan-ng/ui-spinner-helm";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { HlmLabelDirective } from "@spartan-ng/ui-label-helm";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../../../core/services/storage.service";

@Component({
	selector: "oryo-home",
	standalone: true,

	imports: [
		HlmSpinnerComponent,
		ReactiveFormsModule,
		HlmButtonDirective,
		HlmInputDirective,
		HlmLabelDirective,
	],
	templateUrl: "./activate-staff.component.html",
	styleUrl: "./activate-staff.component.css",
})
export class ActivateStaffComponent {
	_router = inject(Router);
	_fb = inject(FormBuilder);
	_authService = inject(AuthService);
	_activateRoute = inject(ActivatedRoute);
	staffName = inject(StorageService).getLoggedInStaff()?.staff.name;

	token = signal<string | null>(inject(ActivatedRoute).snapshot.paramMap.get("token"));
	isActivatingStaff = signal<boolean>(false);
	activateStaffForm = this._fb.nonNullable.group({
		password: this._fb.nonNullable.control("", Validators.required),
		confirmPassword: this._fb.nonNullable.control("", Validators.required),
	});

	onSubmit() {
		if (!this.token()) {
			toast.error("Token is required, verify the url from your email", {
				id: "invalid-activateToken",
			});
			return;
		}

		const { password, confirmPassword } = this.activateStaffForm.value;

		if (!password || !confirmPassword) {
			toast.error("Form is invalid. All fields are should be filled", {
				id: "invalid-activateStaffForm",
			});
			return;
		}

		if (password.length < 8) {
			toast.error("Password must be at least 8 characters long", {
				id: "invalid-passwordLength",
			});
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Passwords does not match", {
				id: "invalid-passwordMatch",
			});
			return;
		}

		this.isActivatingStaff.set(true);
		const payload = {
			password,
			token: this.token()!,
		};

		this._authService.activateStaffAccount(payload).subscribe({
			next: (_res) => {
				this.isActivatingStaff.set(false);
				toast.success("Your account has been activated succesfully.", {
					id: "valid-accountActivation",
				});
				this._router.navigateByUrl("/login");
			},
			error: () => {
				this.isActivatingStaff.set(false);
			},
		});
	}
}
