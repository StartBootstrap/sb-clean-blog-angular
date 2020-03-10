import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilityService } from '@common/services';
import { MockUser, User } from '@testing/mocks';
import { UtilityServiceStub } from '@testing/stubs';

import { AuthUtilsService } from './auth-utils.service';

const testUser: User = new MockUser();

describe('Auth Utils Service', () => {
    let authUtilsService: AuthUtilsService;
    let utilityService: UtilityService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthUtilsService,
                { provide: UtilityService, useValue: new UtilityServiceStub() },
            ],
        });

        authUtilsService = TestBed.inject(AuthUtilsService);
        utilityService = TestBed.inject(UtilityService);
    });

    describe('checkToken$', () => {
        it('should return an Observable<string> if token is valid', () => {
            authUtilsService.jwtHelperService = {
                decodeToken: () => 'TOKEN_PAYLOAD',
                isTokenExpired: () => false,
            } as JwtHelperService;
            spyOn(utilityService.localStorage, 'getItem').and.returnValue('TOKEN');
            authUtilsService.checkToken$().subscribe(response => {
                expect(response).toEqual('TOKEN');
            });
        });
        it('should throw an error is there is no token', () => {
            authUtilsService.jwtHelperService = {
                decodeToken: () => 'TOKEN_PAYLOAD',
                isTokenExpired: () => false,
            } as JwtHelperService;
            // spyOn(utilityService.localStorage, 'getItem').and.returnValue(undefined);
            authUtilsService.checkToken$().subscribe(
                response => {},
                error => {
                    expect(error).toEqual(new Error('INVALID_JWT'));
                }
            );
        });
        it('should throw an error if token is expired', () => {
            authUtilsService.jwtHelperService = {
                decodeToken: () => 'TOKEN_PAYLOAD',
                isTokenExpired: () => true,
            } as JwtHelperService;
            // spyOn(utilityService.localStorage, 'getItem').and.returnValue('TOKEN');
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
            spyOn(authUtilsService, '_storeToken');
            spyOn(authUtilsService, '_decodeToken').and.returnValue(testUser);
            authUtilsService.processToken$('PASSED_TOKEN').subscribe(response => {
                expect(response).toEqual(testUser);
                expect(authUtilsService._storeToken).toHaveBeenCalledTimes(1);
                expect(authUtilsService._decodeToken).toHaveBeenCalledWith('PASSED_TOKEN');
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

    describe('_decodeToken', () => {
        it('should return a decoded Token, which is a User', () => {
            authUtilsService.jwtHelperService = {
                decodeToken: () => testUser,
            } as JwtHelperService;
            const response = authUtilsService._decodeToken('PASSED_TOKEN');
            expect(response).toEqual(testUser);
        });
    });

    describe('checkToken', () => {
        it('should call _jstIsValid', () => {
            spyOn(authUtilsService, '_jwtIsValid');
            authUtilsService.checkToken();
            expect(authUtilsService._jwtIsValid).toHaveBeenCalled();
        });
    });

    describe('_storeToken', () => {
        it('should store the token in local storage', () => {
            spyOn(utilityService.localStorage, 'setItem');
            authUtilsService._storeToken('PASSED_TOKEN');
            expect(utilityService.localStorage.setItem).toHaveBeenCalled();
        });
    });

    describe('removeTokens', () => {
        it('should remove the token from local storage', () => {
            spyOn(utilityService.localStorage, 'removeItem');
            authUtilsService.removeTokens();
            expect(utilityService.localStorage.removeItem).toHaveBeenCalled();
        });
    });

    describe('Observables', () => {
        it('should return _isLoggedIn$ Observable', () => {
            authUtilsService.isLoggedIn$().subscribe(response => {
                expect(response).toBeDefined();
            });
        });
        it('should return _decodeToken$ Observable', () => {
            spyOn(authUtilsService, '_decodeToken');
            authUtilsService.decodeToken$('TEST_TOKEN').subscribe(response => {
                expect(authUtilsService._decodeToken).toHaveBeenCalled();
            });
        });
    });

    describe('bearerToken', () => {
        it('should return bearer token string', () => {
            spyOn(authUtilsService, '_jwtIsValid').and.returnValue('TEST_TOKEN');
            expect(authUtilsService.bearerToken()).toEqual('bearer TEST_TOKEN');
            expect(authUtilsService._jwtIsValid).toHaveBeenCalled();
        });
        it('should return false if no token', () => {
            spyOn(authUtilsService, '_jwtIsValid').and.returnValue(false);
            expect(authUtilsService.bearerToken()).toEqual(false);
            expect(authUtilsService._jwtIsValid).toHaveBeenCalled();
        });
    });

    describe('postOptionsAuthHeaders', () => {
        it('should return auth header with bearer token', () => {
            spyOn(authUtilsService, 'bearerToken').and.returnValue('TEST');

            expect({ ...authUtilsService.postOptionsAuthHeaders() }).toEqual({
                headers: { Authorization: 'TEST' },
            });
            expect(authUtilsService.bearerToken).toHaveBeenCalled();
        });
    });

    describe('_jwtIsValid', () => {
        it('should handle no token in local storage', () => {
            spyOn(utilityService.localStorage, 'getItem').and.returnValue(null);
            expect(authUtilsService._jwtIsValid()).toBeFalse();
            expect(utilityService.localStorage.getItem).toHaveBeenCalled();
        });
        it('should handle expired tokens', () => {
            spyOn(utilityService.localStorage, 'getItem').and.returnValue('TEST');
            spyOn(authUtilsService.jwtHelperService, 'isTokenExpired').and.returnValue(true);
            expect(authUtilsService._jwtIsValid()).toBeFalse();
            expect(authUtilsService.jwtHelperService.isTokenExpired).toHaveBeenCalled();
        });
    });
});
