import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BlogService } from '@modules/blog/services';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class PostGuard implements CanActivate {
    constructor(private blogService: BlogService) {}
    canActivate(_next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._canActivate(_next, state);
    }

    _canActivate(_next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.blogService.getPost$(_next.params.post).pipe(
            switchMap(post => {
                if (post) {
                    return of(true);
                }
                return of(false);
            })
        );
    }
}
