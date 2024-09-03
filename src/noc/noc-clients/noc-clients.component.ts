import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideArrowLeft,
  lucideBell,
  lucideChevronsUpDown,
  lucideFilter,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
  BrnPopoverComponent,
  BrnPopoverTriggerDirective,
  BrnPopoverContentDirective,
  BrnPopoverCloseDirective,
} from '@spartan-ng/ui-popover-brain';
import {
  HlmPopoverContentDirective,
  HlmPopoverCloseDirective,
} from '@spartan-ng/ui-popover-helm';
import { ContactComponent } from '../noc-client-details/contact/contact.component';
import { CreateComponent } from "../noc-client-details/create/create.component";
import { NocService } from '../services/noc.service';
import { CarGlobal, Companies, RefuelRecord } from '../noc.model';

@Component({
  selector: 'oryo-noc-clients',
  standalone: true,
  imports: [
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    BrnPopoverCloseDirective,
    HlmPopoverContentDirective,
    HlmPopoverCloseDirective,
    HlmButtonDirective,
    CreateComponent
],
  providers: [
    provideIcons({
      lucideChevronsUpDown,
      lucideFilter,
      lucideBell,
      lucideArrowLeft,
    }),
  ],
  templateUrl: './noc-clients.component.html',
  styleUrl: './noc-clients.component.css',
})
export class NocClientsComponent implements OnInit {
  _router = inject(Router);
  route = inject(ActivatedRoute);
  _hlmDialogService = inject(HlmDialogService);
  _nocService = inject(NocService)
	_companies = signal<Companies[]>([]);
	_global = signal<CarGlobal | null>(null);

  ngOnInit(): void {
    this._nocService.getCompanies().subscribe({
			next: (res) => {
				this._companies.set(res.data);
        console.log(res.data);
        
			},
			error: () => {
			}
		})

    this._nocService.getCarsGlobal().subscribe({
			next: (res) => {
        console.log(res.data);
				this._global.set(res.data);
        
			},
			error: () => {
			}
		})
  }
  onBack() {
    // Perform action to navigate back to previous page
    this._router.navigate(['/noc']);
  }
  // Other component methods and properties'
  details(e?: any) {
    console.log(e);
    
    const navigationExtras: NavigationExtras = {
      // relativeTo: this.route,
      state: {
        details: e,
      },
    };
    // Perform action to navigate to client details page
    this._router.navigate(['noc', 'details'], navigationExtras);
  }

  openDynamicComponent(e?: any) {
    const dialogRef = this._hlmDialogService.open(ContactComponent, {
      context: {
        users: e,
      },
    });

    dialogRef.closed$.subscribe((user) => {
      if (user) {
        console.log('Selected user:', user);
      }
    });
  }


}
