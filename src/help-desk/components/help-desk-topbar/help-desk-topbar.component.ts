import { Component, inject } from '@angular/core';
import { lucideBell, lucideCircleArrowLeft, lucideCircleChevronLeft } from '@ng-icons/lucide';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { TopbarService } from '../../core/services/topbar.service';
import { InitialsPipe } from '@spartan-ng/ui-avatar-brain';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'oryo-help-desk-topbar',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
		InitialsPipe,
		RouterLink
  ],
  providers: [provideIcons({ lucideBell, lucideCircleChevronLeft})],
  templateUrl: './help-desk-topbar.component.html',
  styleUrl: './help-desk-topbar.component.css'
})
export class HelpDeskTopbarComponent {
  _topbarDetails = inject(TopbarService).topbarDetails;

}
