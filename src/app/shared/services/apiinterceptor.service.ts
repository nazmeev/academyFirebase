import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiinterceptorService implements HttpInterceptor{
  private apiKey: string = '0994e7679a856150aadcecf7de489bce';

  constructor(private router: Router){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const request = req.clone({setParams: {
        api_key: this.apiKey,
        language: 'ru-RU'
      }
    })

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) console.log('Server response')
          console.log('HttpResponse', event)
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            console.log('err.status', err.status)
            if (err.status == 401) this.router.navigate(['/error', { statusCode: err.status, statusText: err.statusText }], {skipLocationChange: true})
          }
        }
      ), finalize(() => console.log("Finish"))
    )
  }
}