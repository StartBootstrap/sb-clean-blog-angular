import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { User } from '@modules/auth/models';
import { LoginPayload, TokenResponse } from '@start-bootstrap/sb-clean-blog-shared-types';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthUtilsService } from './auth-utils.service';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private authUtilsService: AuthUtilsService,
        private router: Router
    ) {}

    login$(loginPayload: LoginPayload): Observable<boolean> {
        return this.http
            .post<TokenResponse>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/auth/login`,
                loginPayload
            )
            .pipe(
                switchMap(
                    (loginResults): Observable<User> =>
                        this.authUtilsService.processToken$(loginResults.token)
                ),
                switchMap(user => {
                    return from(this.router.navigate(['/']));
                }),
                catchError((error: Error) => throwError(error))
            );
    }
}
