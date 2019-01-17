import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import dynamoConverters from 'dynamo-converters';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DynamoInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      map(evt => {
        if (evt instanceof HttpResponse) {
          try {
            evt = evt.clone({ body: evt.body.Items.map(eventItem => dynamoConverters.itemToData(eventItem)) });
          } catch (err) {
            console.log('Assuming not a Dynamo response; not converting.', err);
          }
        }
        return evt;
      })
    );
  }
}
