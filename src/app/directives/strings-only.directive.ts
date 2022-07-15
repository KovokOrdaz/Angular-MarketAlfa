import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[StringsOnly]'
})
export class StringsOnlyDirective {

  constructor(private readonly elementRef: ElementRef) { }

  @HostListener('input', ['$event'])
  onChangeInput(event: Event): void
  {
    const REGEX = /[^aA-zZ, ]*/g;
    const initValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value =initValue.replace(REGEX, '');
    if(initValue !== this.elementRef.nativeElement.value)
    {
      event.stopPropagation();
    }
  }

}
