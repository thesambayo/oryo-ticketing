import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBell } from '@ng-icons/lucide';
import { HlmAvatarFallbackDirective } from '../../../libs/ui/ui-avatar-helm/src/lib/fallback';
import { HlmAvatarComponent } from '../../../libs/ui/ui-avatar-helm/src/lib/hlm-avatar.component';
import { HlmAvatarImageDirective } from '../../../libs/ui/ui-avatar-helm/src/lib/image';
import { HlmIconComponent } from '../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { AuthService } from '../../../libs/services/auth.service';
import { TopbarService } from '../../../help-desk/core/services/topbar.service';
import { InitialsPipe } from '@spartan-ng/ui-avatar-brain';

@Component({
  selector: 'oryo-noc-header',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
		InitialsPipe
  ],
  providers: [provideIcons({ lucideBell})],
  templateUrl: './noc-header.component.html',
  styleUrl: './noc-header.component.css'
})
export class NocHeaderComponent {
	_topbarDetails = inject(TopbarService).topbarDetails;

}
