import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBell } from '@ng-icons/lucide';
import { HlmAvatarFallbackDirective } from '../libs/ui/ui-avatar-helm/src/lib/fallback';
import { HlmAvatarComponent } from '../libs/ui/ui-avatar-helm/src/lib/hlm-avatar.component';
import { HlmAvatarImageDirective } from '../libs/ui/ui-avatar-helm/src/lib/image';
import { HlmIconComponent } from '../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'oryo-home',
  standalone: true,
  
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
    RouterLink,
    RouterLinkActive
  ],
  providers: [provideIcons({ lucideBell})],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
