import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from '@common/services';
import { Post } from '@testing/mocks';
import base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import { Observable, of } from 'rxjs';

import demoConfig from './demo.config.json';

@Injectable({
    providedIn: 'root',
})
export class DemoInterceptor implements HttpInterceptor {
    posts!: Post[];
    secret = 'SHHHHHHHHH';

    constructor(private utilityService: UtilityService) {
        const demoPosts = this.utilityService.getStoredObject<Post[]>('DEMO_POSTS');
        if (demoPosts) {
            this.posts = demoPosts;
        } else {
            this.posts = demoConfig.posts;
            this._savePosts();
        }
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log(request);

        if (!demoConfig.enabled) {
            return next.handle(request);
        }

        if (request.url.match(/\/api\/latest\/auth\/login$/)) {
            // login$
            return of(
                new HttpResponse({
                    status: 200,
                    body: {
                        token: this._createToken(),
                    },
                })
            );
        }

        if (request.url.match(/\/api\/latest\/posts$/)) {
            // getPosts$
            return of(new HttpResponse({ status: 200, body: demoConfig.posts }));
        }

        if (request.url.match(/\/api\/latest\/posts\/.+$/)) {
            switch (request.method) {
                case 'GET':
                    // getPost$
                    const slugMatch = request.url.match(/[\w-]+$/);
                    if (slugMatch) {
                        return of(
                            new HttpResponse({
                                status: 200,
                                body: this.posts.find(post => post.slug === slugMatch[0]),
                            })
                        );
                    }
                    console.log(`### ERROR: Issue with getPost$ in DemoInterceptor`);
                    return of({} as HttpEvent<unknown>);
                case 'POST':
                    // createPost$
                    return of({} as HttpEvent<unknown>);
                case 'PUT':
                    // updatePost$
                    return of({} as HttpEvent<unknown>);
                case 'DELETE':
                    // deletePost$
                    return of({} as HttpEvent<unknown>);
            }
        }

        return next.handle(request);
    }

    _savePosts() {
        this.utilityService.storeObject('DEMO_POSTS', this.posts);
    }

    _createToken() {
        const stringifiedData = utf8.parse(
            JSON.stringify({
                id: 'test123',
                firstName: 'Testy',
                lastName: 'McTestface',
                email: 'test@test.test',
            })
        );
        const encodedData = this._base64url(stringifiedData);
        const stringifiedHeader = utf8.parse(
            JSON.stringify({
                alglg: 'HS256',
                typ: 'JWT',
            })
        );
        const encodedHeader = this._base64url(stringifiedHeader);
        const signature = hmacSHA256(`${encodedHeader}.${encodedData}`, this.secret);

        return `${encodedHeader}.${encodedData}.${this._base64url(signature)}`;
    }

    _base64url(source: unknown) {
        // Encode in classical base64
        let encodedSource = base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        return encodedSource;
    }
}
