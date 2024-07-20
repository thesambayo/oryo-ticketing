import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'oryo-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, HlmToasterComponent],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'oryo internal tools';
}
