import { Directive, Input, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appInputError]',
})
export class InputErrorDirective implements OnInit {
  @Input() appInputError?: AbstractControl | null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('blur') onBlur() {
    this._validField();
  }

  ngOnInit(): void {
    this.appInputError?.statusChanges.subscribe((_) => {
      this._validField();
    });
  }

  private _validField(): void {
    if (this.appInputError?.touched && this.appInputError?.errors) {
      this.renderer.addClass(this.el.nativeElement, 'invalid-input');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'invalid-input');
    }
  }
}
