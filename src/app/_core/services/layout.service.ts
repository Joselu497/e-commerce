import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  // Indicates whether the offcanvas is open or not
  isOffcanvasOpen = signal(false);

  /**
   * Opens the offcanvas in the layout component
   */
  openOffcanvas(): void {
    this.isOffcanvasOpen.set(true);
  }

  /**
   * Closes the offcanvas in the layout component
   */
  closeOffcanvas(): void {
    this.isOffcanvasOpen.set(false);
  }

  /**
   * Toggles the offcanvas in the layout component
   */
  toggleOffcanvas(): void {
    this.isOffcanvasOpen.update((state) => !state);
  }
}
