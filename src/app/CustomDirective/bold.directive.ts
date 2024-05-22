import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[boldText]'
})
export class BoldDirective implements OnInit{

  constructor(private element: ElementRef, private render: Renderer2) { }
  
  ngOnInit(): void {
    this.render.setStyle(this.element.nativeElement, 'fontWeight', '800');  
  }

}
