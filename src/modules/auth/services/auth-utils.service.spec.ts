import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RouterStateUrl, TestRouterStateUrl, TestUser, User } from '@testing/common';
// import { localStorageServiceStub } from '@testing/stubs';
// import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';

import { AuthService } from '../../account/services/auth.service';

import { AuthUtilsService } from './auth-utils.service';

const testUser: User = new TestUser();
const testRouterStateUrl: RouterStateUrl = new TestRouterStateUrl();

describe('Auth Utils Service', () => {
    let authService: AuthService;
    let authUtilsService: AuthUtilsService;
    // let localStorageService: LocalStorageService;

    let authServiceStub: Partial<AuthService>;

    authServiceStub = {
        getRouterState$: () => of(testRouterStateUrl),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthUtilsService,
                { provide: AuthService, useValue: authServiceStub },
                // { provide: LocalStorageService, useValue: localStorageServiceStub },
            ],
        });

        authService = TestBed.get(AuthService);
        authUtilsService = TestBed.get(AuthUtilsService);
        // localStorageService = TestBed.get(LocalStorageService);
    });

    describe('checkToken$', () => {
        it('should return an Observable<string> if token is valid', () => {
            authUtilsService.jwtHelperService = <JwtHelperService>{
                decodeToken: () => 'TOKEN_PAYLOAD',
                isTokenExpired: () => false,
            };
            spyOn(localStorageService, 'retrieve').and.returnValue('TOKEN');
            authUtilsService.checkToken$().subscribe(response => {
                expect(response).toEqual('TOKEN');
            });
        });
        it('should throw an error is there is no token', () => {
            authUtilsService.jwtHelperService = <JwtHelperService>{
                decodeToken: () => 'TOKEN_PAYLOAD',
                isTokenExpired: () => false,
            };
            // spyOn(localStorageService, 'retrieve').and.returnValue(undefined);
            authUtilsService.checkToken$().subscribe(
                response => {},
                error => {
                    expect(error).toEqual(new Error('INVALID_JWT'));
                }
            );
        });
        it('should throw an error if token is expired', () => {
            authUtilsService.jwtHelperService = <JwtHelperService>{
                decodeToken: () => 'TOKEN_PAYLOAD',
                isTokenExpired: () => true,
            };
            // spyOn(localStorageService, 'retrieve').and.returnValue('TOKEN');
            authUtilsService.checkToken$().subscribe(
                response => {},
                error => {
                    expect(error).toEqual(new Error('INVALID_JWT'));
                }
            );
        });
    });

    describe('processToken$', () => {
        it('should return an Observable<User> if token is valid', () => {
            spyOn(authUtilsService, 'storeToken');
            spyOn(authUtilsService, 'decodeToken').and.returnValue(testUser);
            authUtilsService.processToken$('PASSED_TOKEN').subscribe(response => {
                expect(response).toEqual(testUser);
                expect(authUtilsService.storeToken).toHaveBeenCalledTimes(1);
                expect(authUtilsService.decodeToken).toHaveBeenCalledWith('PASSED_TOKEN');
            });
        });
        it('should throw an error if there is no token', () => {
            authUtilsService.processToken$('').subscribe(
                response => {},
                error => {
                    expect(error).toEqual(new Error('NO_TOKEN'));
                }
            );
        });
    });

    describe('checkAllowedUnauthenticatedURL$', () => {
        it('should return an Observable<boolean> true if user is not visiting /account/create', () => {
            authUtilsService
                .checkAllowedUnauthenticatedURL$('/account/create')
                .subscribe(response => {
                    expect(response).toEqual(true);
                });
        });
        it('should return an Observable<boolean> false if user is not visiting /account/create', () => {
            authUtilsService
                .checkAllowedUnauthenticatedURL$('/account/test/overview/')
                .subscribe(response => {
                    expect(response).toEqual(false);
                });
        });
    });

    describe('decodeToken', () => {
        it('should return a decoded Token, which is a User', () => {
            authUtilsService.jwtHelperService = <JwtHelperService>{
                decodeToken: () => testUser,
            };
            const response = authUtilsService.decodeToken('PASSED_TOKEN');
            expect(response).toEqual(testUser);
        });
    });

    describe('checkToken', () => {
        it('should return token', () => {
            authUtilsService.jwtHelperService = <JwtHelperService>{
                isTokenExpired: () => false,
            };
            spyOn(localStorageService, 'retrieve').and.returnValue('TOKEN');

            const response = authUtilsService.checkToken();
            expect(response).toEqual('TOKEN');
        });
        it('should return false', () => {
            authUtilsService.jwtHelperService = <JwtHelperService>{
                isTokenExpired: () => true,
            };
            spyOn(localStorageService, 'retrieve').and.returnValue('TOKEN');

            const response = authUtilsService.checkToken();
            expect(response).toEqual(false);
        });
    });

    describe('storeToken', () => {
        it('should store the token in local storage', () => {
            spyOn(localStorageService, 'store');
            authUtilsService.storeToken('PASSED_TOKEN');
            expect(localStorageService.store).toHaveBeenCalled();
        });
    });

    describe('removeTokens', () => {
        it('should remove the token from local storage', () => {
            spyOn(localStorageService, 'clear');
            authUtilsService.removeTokens();
            expect(localStorageService.clear).toHaveBeenCalled();
        });
    });
});
