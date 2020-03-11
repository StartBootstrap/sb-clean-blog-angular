import { TestBed } from '@angular/core/testing';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    ChildActivationEnd,
    Router,
} from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '@testing/stubs';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
    let navigationService: NavigationService;
    let router: RouterStub;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NavigationService,
                { provide: ActivatedRoute, useValue: new ActivatedRouteStub({}) },
                { provide: Router, useValue: new RouterStub() },
            ],
        });
        navigationService = TestBed.inject(NavigationService);
        router = (TestBed.inject(Router) as unknown) as RouterStub;
    });

    it('should listen for router events upon creation', () => {
        spyOn(navigationService._routeData$, 'next');
        spyOn(navigationService._currentURL$, 'next');
        spyOn(navigationService._currentComponent$, 'next');
        router.events.next(
            new ChildActivationEnd(({
                firstChild: {
                    firstChild: null,
                    data: {},
                    component: {
                        id: 'TEST',
                    },
                },
            } as unknown) as ActivatedRouteSnapshot)
        );
        expect(navigationService._routeData$.next).toHaveBeenCalled();
        expect(navigationService._currentURL$.next).toHaveBeenCalled();
        expect(navigationService._currentComponent$.next).toHaveBeenCalled();
    });

    describe('Observables', () => {
        it('should return _routeData$ Observable', () => {
            navigationService.routeData$().subscribe(response => {
                expect(response).toBeDefined();
            });
        });
        it('should return _currentURL$ Observable', () => {
            navigationService.currentURL$().subscribe(response => {
                expect(response).toBeDefined();
            });
        });
        it('should return _currentComponent$ Observable', () => {
            navigationService.currentComponent$().subscribe(response => {
                expect(response).toBeDefined();
            });
        });
    });
});
