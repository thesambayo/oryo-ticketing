import { Component } from '@angular/core';
import { lucideBell } from '@ng-icons/lucide';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';


@Component({
  selector: 'oryo-topbar',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
  ],
  providers: [provideIcons({ lucideBell})],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  // topbar will have a service that will be used to update its content

}
