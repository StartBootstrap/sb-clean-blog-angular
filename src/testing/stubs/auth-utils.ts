import { AuthUtilsService } from '@modules/auth/services';
import { MockUser } from '@testing/mocks';
import { of } from 'rxjs';

export const AuthUtilsServiceStub: Partial<AuthUtilsService> = {
    isLoggedIn$: () => of(true),
    bearerToken: () => 'bearer TEST',
    checkToken: () => {},
    checkToken$: () => of('TEST_TOKEN'),
    processToken$: () => of(new MockUser()),
    _decodeToken: () => new MockUser(),
    decodeToken$: () => of(new MockUser()),
    _storeToken: () => {},
    removeTokens: () => {},
    _jwtIsValid: () => true,
};
