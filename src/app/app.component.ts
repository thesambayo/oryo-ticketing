import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'oryo-root',
  standalone: true,
  template: `
    <router-outlet />
    <hlm-toaster position="top-right" richColors />
  `,
  imports: [RouterOutlet, HlmToasterComponent],
	viewProviders: [provideIcons({ lucideCheck })],
})
export class AppComponent {
  title = 'oryo internal tools';
}
