import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelpDeskSidebarComponent } from '../../../help-desk/components/help-desk-sidebar/help-desk-sidebar.component';
import { HelpDeskTopbarComponent } from '../../../help-desk/components/help-desk-topbar/help-desk-topbar.component';
import { BdmSidebarComponent } from '../bdm-sidebar/bdm-sidebar.component';
import { BdmTopbarComponent } from '../bdm-topbar/bdm-topbar.component';

@Component({
  selector: 'oryo-bdm-container',
  standalone: true,
  imports: [RouterOutlet, BdmSidebarComponent, BdmTopbarComponent],
  templateUrl: './bdm-container.component.html',
  styleUrl: './bdm-container.component.css'
})
export class BdmContainerComponent {

}
