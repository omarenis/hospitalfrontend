import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SecureStorageService} from '../services/secure-storage.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private httpClient: HttpClient, private router: Router, private injector: Injector) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const secureStorageService = this.injector.get(SecureStorageService);
        const token = localStorage.getItem('access');
        if (token !== null){
            console.log(secureStorageService.getToken(token));
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error.status);
                if (error.status === 401){
                    if (request.url.indexOf('logout') !== -1){
                        localStorage.clear();
                        this.router.navigate(['/']).then(r => {console.log(r); });
                    }
                }
                return throwError(error);
            }
       ));
    }
}
