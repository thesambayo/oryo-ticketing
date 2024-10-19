import { Component } from '@angular/core';
import { NocHeaderComponent } from '../noc-header/noc-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'oryo-noc-container',
  standalone: true,
  imports: [NocHeaderComponent, RouterOutlet],
  templateUrl: './noc-container.component.html',
  styleUrl: './noc-container.component.css'
})
export class NocContainerComponent {

}
