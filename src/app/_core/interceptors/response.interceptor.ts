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
export class ResponseInterceptor implements HttpInterceptor {
  private _notificationService: NotificationService =
    inject(NotificationService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = ''
        switch (error.status) {
          case 0:
            errorMessage = 'No server connection';
            break;
          case 400:
          case 401:
            errorMessage = error.error;
            break;
          case 500:
            errorMessage = 'Internal server error';
            break;
          default:
            errorMessage = 'Something went wrong';
        }
        this._notificationService.error(errorMessage);
        
        return throwError(() => error);
      })
    );
  }
}
