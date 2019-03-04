import { Component } from '@angular/core';
import { SplashService } from '../../services';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent {

  constructor(public splashService: SplashService) { }

}
