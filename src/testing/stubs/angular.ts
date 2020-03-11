// https://angular.io/guide/testing#activatedroutestub

import {
    ActivationEnd,
    ActivationStart,
    ChildActivationEnd,
    ChildActivationStart,
    convertToParamMap,
    ParamMap,
    Params,
    RouteConfigLoadEnd,
    RouteConfigLoadStart,
    RouterEvent,
    Scroll,
} from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
    constructor(initialParams: Params) {
        this.setParamMap(initialParams);
    }
    static fragment = new BehaviorSubject<string>('');
    static snapshot = {
        fragment: '',
    };
    // Use a ReplaySubject to share previous values with subscribers
    // and pump new values into the `paramMap` observable
    private subject = new ReplaySubject<ParamMap>();

    /** The mock paramMap observable */
    readonly paramMap = this.subject.asObservable();
    // readonly fragment = this._fragment.asObservable();
    /** Set the paramMap observables's next value */
    setParamMap(params: Params) {
        this.subject.next(convertToParamMap(params));
    }
}

export class RouterStub {
    events = new BehaviorSubject<
        | ChildActivationEnd
        | RouterEvent
        | RouteConfigLoadStart
        | RouteConfigLoadEnd
        | ChildActivationStart
        | ActivationStart
        | ActivationEnd
        | Scroll
        | undefined
    >({} as RouterEvent);
    url = 'test';
    navigate() {}
    navigateByUrl() {}
}

export const ChangeDetectorRefStub = {
    detectChanges: () => {},
};
