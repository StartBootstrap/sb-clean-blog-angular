import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService, UtilityService } from '@common/services';
import { CreatePostPayload, UpdatePostPayload } from '@start-bootstrap/sb-clean-blog-shared-types';
import { Post } from '@testing/mocks';
import { paramCase } from 'change-case';
import base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import { format } from 'date-fns';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import demoConfig from './demo.config.json';

@Injectable({
    providedIn: 'root',
})
export class DemoInterceptor implements HttpInterceptor {
    posts!: Post[];
    secret = 'SHHHHHHHHH';

    constructor(private utilityService: UtilityService, private configService: ConfigService) {
        const demoPosts = this.utilityService.getStoredObject<Post[]>('DEMO_POSTS');
        if (demoPosts) {
            this.posts = demoPosts;
        } else {
            this.posts = demoConfig.posts;
            this._savePosts();
        }
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!this.configService.config || !this.configService.config.demoEnabled) {
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
            switch (request.method) {
                case 'GET':
                    // getPosts$
                    return of(new HttpResponse({ status: 200, body: this.posts }));
                case 'POST':
                    // createPost$
                    const body = request.body as CreatePostPayload;
                    const slug = body.slug
                        ? paramCase(body.slug).toLowerCase()
                        : paramCase(body.heading).toLowerCase();
                    const newPost = {
                        id: uuid(),
                        slug,
                        backgroundImage: `url("${body.backgroundImage}")`,
                        heading: body.heading,
                        subHeading: body.subHeading,
                        body: body.body,
                        meta: format(new Date(), 'MMMM d, yyyy'),
                    };
                    this.posts.unshift(newPost);
                    this._savePosts();
                    return of(new HttpResponse({ status: 200, body: newPost }));
            }
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
                case 'PUT':
                    // updatePost$
                    const updatePostPayload = request.body as UpdatePostPayload;
                    const updatePostID = request.url.match(/[\w-]+$/);
                    if (updatePostID) {
                        const foundPost = this.posts.find(post => post.id === updatePostID[0]);
                        updatePostPayload.backgroundImage = updatePostPayload.backgroundImage
                            ? `url("${updatePostPayload.backgroundImage}")`
                            : undefined;

                        Object.assign(foundPost, updatePostPayload);
                        this._savePosts();
                        return of(new HttpResponse({ status: 200, body: undefined }));
                    }

                    console.log(`### ERROR: Issue with updatePost$ in DemoInterceptor`);
                    return of({} as HttpEvent<unknown>);
                case 'DELETE':
                    // deletePost$
                    const deletePostID = request.url.match(/[\w-]+$/);
                    if (deletePostID) {
                        this.posts = this.posts.filter(post => post.id !== deletePostID[0]);
                        this._savePosts();
                        return of(new HttpResponse({ status: 200, body: undefined }));
                    }

                    console.log(`### ERROR: Issue with deletePost$ in DemoInterceptor`);
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
