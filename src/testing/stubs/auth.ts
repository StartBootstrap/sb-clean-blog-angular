import { AuthService } from '@modules/auth/services';
import { of } from 'rxjs';

export const AuthServiceStub: Partial<AuthService> = {
    login$: () => of(true),
};
