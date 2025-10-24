import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * Http interceptor that handles errors and displays them in the toast
 */
@Injectable()
export class httpInterceptor implements HttpInterceptor {
  private _notificationService: NotificationService =
    inject(NotificationService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error)
        this._notificationService.error(error.error);
        return throwError(() => error);
      }),
    );
  }
}
