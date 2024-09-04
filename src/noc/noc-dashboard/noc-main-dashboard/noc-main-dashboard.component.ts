import { Component, inject, OnInit, output, signal } from '@angular/core';
import { CarGlobal } from '../../noc.model';
import { NocService } from '../../services/noc.service';

@Component({
  selector: 'oryo-noc-main-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './noc-main-dashboard.component.html',
  styleUrl: './noc-main-dashboard.component.css'
})
export class NocMainDashboardComponent implements OnInit {

  _nocService = inject(NocService);
	_global = signal<CarGlobal | null>(null);

	// declare input and outputs
	getGlobal = output();

  ngOnInit(): void {
    this._nocService.getCarsGlobal().subscribe({
			next: (res) => {
        // console.log(res.data);
				this._global.set(res.data);
        
			},
			error: () => {
			}
		})
  }

  getGlobalValue(e:any) {
    this.getGlobal.emit(e)
  }

}
