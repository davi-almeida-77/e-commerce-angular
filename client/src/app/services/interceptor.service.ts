import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler,  HttpRequest, 
HTTP_INTERCEPTORS, 
HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  constructor( private _token: TokenStorageService  ) { }

intercept(
  req: HttpRequest<any>, 
  next: HttpHandler
): Observable<HttpEvent<any>> {
  let authenticationToken = req;
  let sessionToken = this._token.getToken();
  if (sessionToken != null) {
    authenticationToken = req.clone({
      headers: req.headers.set(TOKEN_HEADER_KEY, sessionToken),
    });
  }
  return next.handle(authenticationToken);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
];
