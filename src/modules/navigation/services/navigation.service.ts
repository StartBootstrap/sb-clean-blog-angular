import { Injectable } from '@angular/core';
import { ActivatedRoute, ChildActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SBRouteData } from '../models';

@Injectable()
export class NavigationService {
    _routeData$ = new BehaviorSubject({} as SBRouteData);
    _currentURL$ = new BehaviorSubject('');
    _currentComponent$ = new BehaviorSubject('');

    constructor(public route: ActivatedRoute, public router: Router) {
        this.router.events
            .pipe(filter(event => event instanceof ChildActivationEnd))
            .subscribe(event => {
                let snapshot = (event as ChildActivationEnd).snapshot;
                while (snapshot.firstChild !== null) {
                    snapshot = snapshot.firstChild;
                }

                this._routeData$.next(snapshot.data as SBRouteData);
                this._currentURL$.next(router.url);
                this._currentComponent$.next(
                    ((snapshot.component as unknown) as { id: string }).id
                );
            });
    }

    routeData$(): Observable<SBRouteData> {
        return this._routeData$;
    }

    currentURL$(): Observable<string> {
        return this._currentURL$;
    }

    currentComponent$(): Observable<string> {
        return this._currentComponent$;
    }
}
