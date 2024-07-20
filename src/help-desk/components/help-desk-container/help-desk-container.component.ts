import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelpDeskSidebarComponent } from '../help-desk-sidebar/help-desk-sidebar.component';
import { HelpDeskTopbarComponent } from '../help-desk-topbar/help-desk-topbar.component';

@Component({
  selector: 'oryo-help-desk-container',
  standalone: true,
  imports: [RouterOutlet, HelpDeskSidebarComponent, HelpDeskTopbarComponent],
  templateUrl: './help-desk-container.component.html',
  styleUrl: './help-desk-container.component.css'
})
export class HelpDeskContainerComponent {

}
