import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HlmtDialogService {

  constructor() { }
res: any
  setRes(e: any) {
    this.res = e;
  }
  getRes() {
    return this.res;
  }

}
