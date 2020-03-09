import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthUtilsServiceStub, RouterStub } from '@testing/stubs';

import { AuthUtilsService } from '.';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let authUtilsService: AuthUtilsService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,
                { provide: AuthUtilsService, useValue: AuthUtilsServiceStub },
                { provide: Router, useValue: new RouterStub() },
            ],
        });
        authService = TestBed.inject(AuthService);

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        authUtilsService = TestBed.inject(AuthUtilsService);
        router = TestBed.inject(Router);
    });

    describe('getAuth$', () => {
        it('should return Observable<Auth>', () => {
            // authService.getAuth$().subscribe(response => {
            //     expect(response).toEqual({});
            // });
        });
    });
});
