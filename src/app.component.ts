import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'oryo-root',
  standalone: true,
  template: `
    <router-outlet />
    <hlm-toaster position="top-right" richColors />
  `,
  imports: [RouterOutlet, HlmToasterComponent],
})
export class AppComponent {
  title = 'oryo internal tools';
}
