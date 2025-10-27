import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { Toast } from '../interfaces/toast';
import { take } from 'rxjs/operators';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService],
    });

    service = TestBed.inject(NotificationService);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should remove a specific toast by id', () => {
    service.show('First', 'success');
    service.show('Second', 'error');
    service.show('Third', 'success');

    let toasts: Toast[] = [];
    service.notifications$.pipe(take(1)).subscribe((t) => (toasts = t));
    expect(toasts.length).toBe(3);

    service.remove(2);

    service.notifications$.pipe(take(1)).subscribe((t) => {
      expect(t.length).toBe(2);
      expect(t.find((toast) => toast.id === 2)).toBeUndefined();
      expect(t[0].id).toBe(1);
      expect(t[1].id).toBe(3);
    });
  });

  it('should add success toast using success() method', () => {
    service.success('Operation completed!');

    let toasts: Toast[] = [];
    service.notifications$.pipe(take(1)).subscribe((t) => (toasts = t));

    expect(toasts.length).toBe(1);
    expect(toasts[0].type).toBe('success');
    expect(toasts[0].message).toBe('Operation completed!');
  });

  it('should add error toast using error() method', () => {
    service.error('Something went wrong!');

    let toasts: Toast[] = [];
    service.notifications$.pipe(take(1)).subscribe((t) => (toasts = t));

    expect(toasts.length).toBe(1);
    expect(toasts[0].type).toBe('error');
    expect(toasts[0].message).toBe('Something went wrong!');
  });

  it('should handle many toasts simultaneously', () => {
    for (let i = 0; i < 10; i++) {
      service.show(`Toast ${i}`, i % 2 === 0 ? 'success' : 'error');
    }

    let toasts: Toast[] = [];
    service.notifications$.pipe(take(1)).subscribe((t) => (toasts = t));

    expect(toasts.length).toBe(10);
    expect(toasts[9].id).toBe(10);
  });
});
