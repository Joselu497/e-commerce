import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input() appTooltip: string = '';

  // Tooltip component reference
  private _tooltipRef: ComponentRef<TooltipComponent> | null = null;
  // Container reference
  private _viewContainerRef = inject(ViewContainerRef);
  // Current element
  private _elementRef = inject(ElementRef);

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  /**
   * Add the tooltip component to the DOM and position it in the bottom corner of the element
   */
  showTooltip() {
    if (this._tooltipRef) return;

    this._tooltipRef = this._viewContainerRef.createComponent(TooltipComponent);
    this._tooltipRef.instance.text = this.appTooltip;

    const tooltipElement = this._tooltipRef.location.nativeElement;
    const hostElement = this._elementRef.nativeElement;

    hostElement.style.position = 'relative';

    hostElement.appendChild(tooltipElement);
  }

  /**
   * Destroy the tooltip component and remove it from the DOM
   */
  hideTooltip() {
    this._tooltipRef?.destroy();
    this._tooltipRef = null;
  }

  ngOnDestroy() {
    this.hideTooltip();
  }
}
