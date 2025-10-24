import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _toasts: Toast[] = [];
  private _currentToastId: number = 0;
  private _notificationSubject = new BehaviorSubject<Toast[]>([]);

  get notifications$(): Observable<Toast[]> {
    return this._notificationSubject.asObservable();
  }

  /**
   * Adds a toast to the notifications list and displays it in the toast component
   * @param message - The message to display in the toast
   * @param type - The type of toast (success or error)
   */
  show(message: string, type: 'success' | 'error') {
    const toast = {
      id: this._currentToastId++,
      message,
      type,
    };
    this._toasts.push(toast);

    this._notificationSubject.next(this._toasts);

    setTimeout(() => {
      this._toasts = this._toasts.filter((item) => item.id !== toast.id);
      this._notificationSubject.next(this._toasts);
    }, 5000);
  }

  /**
   * Adds a success toast to the notifications list
   * @param message - The success message to display in the toast
   */
  success(message: string) {
    this.show(message, 'success');
  }

  /**
   * Adds an error toast to the notifications list
   * @param message - The error message to display in the toast
   */
  error(message: string) {
    this.show(message, 'error');
  }
}
