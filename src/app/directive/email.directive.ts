import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appEmail]'
})
export class EmailDirective {
  @Input('appEmail') email: string;
  constructor(private el: ElementRef) { }

   ngOnInit() {
    console.log(this.email);
    this.el.nativeElement.style
    // this.el.nativeElement.style.background = '#5F9EA0';
    // return this.email;
  }

}
