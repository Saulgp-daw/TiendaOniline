import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProductoNotificacion]'
})
export class ProductoNotificacionDirective {

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) { }

  @HostListener('click', ['$event']) onClick($event) {
    if (!$event.target.className.includes('ocultarNotificacion')) {
      this.removeClass('ocultarNotificacion', $event.target);
      this.addClass('mostrarNotificacion', $event.target);
    } else {
      this.removeClass('mostrarNotificacion', $event.target);
      this.addClass('ocultarNotificacion', $event.target);
    }
  }

  addClass(className: string, element: any) {
    this.renderer.addClass(element, className);
  }

  removeClass(className: string, element: any) {
    this.renderer.removeClass(element, className);
  }
}
