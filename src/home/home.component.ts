import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBell } from '@ng-icons/lucide';
import { HlmAvatarFallbackDirective } from '../libs/ui/ui-avatar-helm/src/lib/fallback';
import { HlmAvatarComponent } from '../libs/ui/ui-avatar-helm/src/lib/hlm-avatar.component';
import { HlmAvatarImageDirective } from '../libs/ui/ui-avatar-helm/src/lib/image';
import { HlmIconComponent } from '../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../libs/services/auth.service';
import { InitialsPipe } from '@spartan-ng/ui-avatar-brain';

@Component({
  selector: 'oryo-home',
  standalone: true,
  
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
    RouterLink,
    RouterLinkActive,
		InitialsPipe
  ],
  providers: [provideIcons({ lucideBell})],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
	staffName = inject(AuthService).getLoggedInStaff()?.staff.name;

}
