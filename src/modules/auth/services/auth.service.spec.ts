import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { TestLoginPayload } from '@start-bootstrap/sb-clean-blog-shared-types';
import { MockUser } from '@testing/mocks';
import { AuthUtilsServiceStub, ConfigServiceStub, RouterStub } from '@testing/stubs';
import { of } from 'rxjs';

import { AuthUtilsService } from '.';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let authUtilsService: AuthUtilsService;
    let router: Router;
    let configService: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,
                { provide: AuthUtilsService, useValue: AuthUtilsServiceStub },
                { provide: Router, useValue: new RouterStub() },
                { provide: ConfigService, useValue: new ConfigServiceStub() },
            ],
        });

        authService = TestBed.inject(AuthService);

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        authUtilsService = TestBed.inject(AuthUtilsService);
        router = TestBed.inject(Router);
        configService = TestBed.inject(ConfigService);
        configService.loadConfig();
    });

    describe('login$', () => {
        it('should return Observable<true> when logged in correctly', () => {
            // spyOn(authUtilsService, 'processToken$').and.callFake(() => {
            //     return of(new MockUser());
            // });
            const loginObservable = authService
                .login$(new TestLoginPayload())
                .subscribe(response => {
                    expect(response).toBeTruthy();
                });
            const req = httpTestingController.expectOne(
                'http://localhost:8200/api/latest/auth/login'
            );
            expect(req.request.method).toEqual('POST');
            req.flush(of('TEST_TOKEN'));
            // expect(authUtilsService.processToken$).toHaveBeenCalled();
        });

        it('should error if no user', () => {});
    });
});
