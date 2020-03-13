import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUtilsService } from '@modules/auth/services';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authUtilsService: AuthUtilsService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const bearerToken = this.authUtilsService.bearerToken();

        if (bearerToken && !_isWhiteListed(request.method, request.url)) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: bearerToken,
                },
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['/error/401']);
                }
                if (error.status === 404) {
                    this.router.navigate(['/error/404']);
                }
                if (error.status === 500) {
                    this.router.navigate(['/error/500']);
                }
                return throwError(error);
            })
        );
    }
}

function _isWhiteListed(method: string, url: string): boolean {
    const whiteList: { [index: string]: string[] } = {
        GET: ['assets/*', 'api/latest/posts/*'],
        POST: ['api/latest/auth/login'],
    };
    const paths: string[] = whiteList[method];
    if (paths) {
        for (const path of paths) {
            if (url.match(path)) {
                return true;
            }
        }
    }

    return false;
}
