import { Directive, ElementRef, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColorMaterias]'
})
export class ColorMateriasDirective implements OnInit {

  constructor(private el: ElementRef) { }
  @Input() colorBase: string;
  @Input() colorAlternativo: string;
  @Input('appColorMaterias') resaltarColor: string;

  ngOnInit() {
    // const aux = this.el.nativeElement;

    // console.log(this.resaltarColor);

    this.resaltar(this.resaltarColor);
  }

  private resaltar(color: string) {
    // console.log(color);
    if (parseInt(color) >= 10) {
      this.el.nativeElement.style.background = '#5F9EA0';
    }else{
      this.el.nativeElement.style.background = 'grey';
    }
  }
}
