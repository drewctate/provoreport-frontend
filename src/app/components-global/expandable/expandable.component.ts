import { Component, AfterViewInit, ViewChild, Input, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements AfterViewInit {

  @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper;
  @Input() expanded: boolean;
  @Input() expandHeight: number;

  constructor(public renderer: Renderer) {

  }

  ngAfterViewInit() {
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 28 + 'px');
  }

  toggle() {
    this.expanded = !this.expanded;
  }

}
