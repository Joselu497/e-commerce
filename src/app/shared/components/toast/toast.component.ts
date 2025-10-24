import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from '../../../_core/services/notification.service';
import { Toast } from '../../../_core/interfaces/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit {
  private _notificationService: NotificationService =
    inject(NotificationService);

  toasts: Toast[] = [];

  ngOnInit(): void {
    this._notificationService.notifications$.subscribe(
      (toasts) => (this.toasts = toasts)
    );
  }

  /**
   * Removes a toast from the notifications list
   * @param id - The id of the toast to remove
   */
  removeToast(id: number | undefined): void {
    if (!id) return;
    this._notificationService.remove(id);
  }
}
