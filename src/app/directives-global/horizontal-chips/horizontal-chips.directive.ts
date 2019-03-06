import { Directive, ElementRef, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: '[appHorizontalChips]'
})
export class HorizontalChipsDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    const matChipWrapperDiv = this.el.nativeElement.children[0];
    this.renderer.setElementStyle(matChipWrapperDiv, 'display', 'block');
    this.renderer.setElementStyle(matChipWrapperDiv, 'white-space', 'nowrap');
    this.renderer.setElementStyle(matChipWrapperDiv, 'overflow-x', 'auto');
  }

}
