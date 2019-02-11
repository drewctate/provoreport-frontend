import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import dynamoConverters from 'dynamo-converters';

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
            const parsedFromDynamo: Event[] = evt.body.Items.map(eventItem => dynamoConverters.itemToData(eventItem));
            const nonesNowNulls: Event[] = parsedFromDynamo.map(event => this.nonesToNulls(event));
            evt = evt.clone({ body: nonesNowNulls });
          } catch (err) {
            console.log('Assuming not a Dynamo response; not converting.', err);
          }
        }
        return evt;
      })
    );
  }
}
