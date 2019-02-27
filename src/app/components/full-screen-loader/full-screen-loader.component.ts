import { Component } from '@angular/core';
import { FullScreenLoaderService } from 'src/app/services/full-screen-loader/full-screen-loader.service';

@Component({
  selector: 'app-full-screen-loader',
  templateUrl: './full-screen-loader.component.html',
  styleUrls: ['./full-screen-loader.component.scss']
})
export class FullScreenLoaderComponent {

  constructor(public fullScreenLoaderService: FullScreenLoaderService) { }

}
