import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SplashService {
  public showing = true;

  constructor() { }

  public hide() {
    this.showing = false;
  }

  public show() {
    this.showing = true;
  }
}
