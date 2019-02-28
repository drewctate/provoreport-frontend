import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../types';

@Injectable()
export class DynamoInterceptor implements HttpInterceptor {

  private nonesToNulls(event: Event) {
    for (const attr in event) {
      if (event[attr] === 'none') {
        event[attr] = null;
      }
    }
    return event;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      map(evt => {
        if (evt instanceof HttpResponse) {
          try {
            if (evt.url.includes('events?startDateTime')) {
              const items = evt.body;
              const nonesNowNulls: Event[] = items.map(event => this.nonesToNulls(event));
              evt = evt.clone({ body: nonesNowNulls });
            }
          } catch (err) {
            console.log('Error in interceptor: ', err);
          }
        }
        return evt;
      })
    );
  }
}
