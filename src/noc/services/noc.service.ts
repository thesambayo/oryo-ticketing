import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NocService {
	apiURL = ' http://localhost:6200';
	_http = inject(HttpClient);
}
