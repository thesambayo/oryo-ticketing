import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'oryo-home-view',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent {

}
