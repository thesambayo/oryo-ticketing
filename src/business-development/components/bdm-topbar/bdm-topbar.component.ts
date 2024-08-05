import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBell } from '@ng-icons/lucide';
import { HlmAvatarFallbackDirective } from '../../../libs/ui/ui-avatar-helm/src/lib/fallback';
import { HlmAvatarComponent } from '../../../libs/ui/ui-avatar-helm/src/lib/hlm-avatar.component';
import { HlmAvatarImageDirective } from '../../../libs/ui/ui-avatar-helm/src/lib/image';
import { HlmIconComponent } from '../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { AuthService } from '../../../libs/services/auth.service';

@Component({
  selector: 'oryo-bdm-topbar',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
  ],
  providers: [provideIcons({ lucideBell})],
  templateUrl: './bdm-topbar.component.html',
  styleUrl: './bdm-topbar.component.css'
})
export class BdmTopbarComponent {

	staffName = inject(AuthService).getLoggedInStaff()?.staff.name;
}
