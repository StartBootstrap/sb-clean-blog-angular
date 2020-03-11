import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { MockCreatePostPayload, MockPost, MockUpdatePostPayload } from '@testing/mocks';
import { ConfigServiceStub, RouterStub } from '@testing/stubs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BlogService } from './blog.service';

describe('BlogService', () => {
    let blogService: BlogService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let router: Router;
    let configService: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                BlogService,
                { provide: Router, useValue: new RouterStub() },
                { provide: ConfigService, useValue: new ConfigServiceStub() },
            ],
        });

        blogService = TestBed.inject(BlogService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        router = TestBed.inject(Router);
        configService = TestBed.inject(ConfigService);
        configService.loadConfig();
    });

    describe('getPosts$', () => {
        it('should return an array of posts', () => {
            blogService.getPosts$().subscribe(response => {
                expect(response.length).toEqual(1);
            });
            const req = httpTestingController.expectOne('http://localhost:8200/api/latest/posts');
            expect(req.request.method).toEqual('GET');
            req.flush([new MockPost()]);
        });
        it('should handle errors', () => {
            blogService
                .getPosts$()
                .pipe(
                    catchError((error: Error) => {
                        expect(error).toBeDefined();
                        return of([]);
                    })
                )
                .subscribe(response => {});
            const req = httpTestingController.expectOne('http://localhost:8200/api/latest/posts');
            expect(req.request.method).toEqual('GET');
            req.error(new ErrorEvent('TEST_ERROR'));
        });
    });

    describe('getPost$', () => {
        it('should return a post by slug', () => {
            blogService.getPost$('TEST_SLUG').subscribe(response => {
                expect(response).toBeTruthy();
            });
            const req = httpTestingController.expectOne(
                'http://localhost:8200/api/latest/posts/TEST_SLUG?findBy=slug'
            );
            expect(req.request.method).toEqual('GET');
            req.flush(new MockPost());
        });
        it('should handle errors', () => {
            blogService
                .getPost$('TEST_SLUG')
                .pipe(
                    catchError((error: Error) => {
                        expect(error).toBeDefined();
                        return of();
                    })
                )
                .subscribe(response => {});
            const req = httpTestingController.expectOne(
                'http://localhost:8200/api/latest/posts/TEST_SLUG?findBy=slug'
            );
            expect(req.request.method).toEqual('GET');
            req.error(new ErrorEvent('TEST_ERROR'));
        });
    });

    describe('createPost$', () => {
        it('should return a post by slug', () => {
            blogService.createPost$(new MockCreatePostPayload()).subscribe(response => {
                expect(response).toBeTruthy();
            });
            const req = httpTestingController.expectOne('http://localhost:8200/api/latest/posts');
            expect(req.request.method).toEqual('POST');
            req.flush(new MockPost());
        });
        it('should handle errors', () => {
            blogService
                .createPost$(new MockCreatePostPayload())
                .pipe(
                    catchError((error: Error) => {
                        expect(error).toBeDefined();
                        return of();
                    })
                )
                .subscribe(response => {});
            const req = httpTestingController.expectOne('http://localhost:8200/api/latest/posts');
            expect(req.request.method).toEqual('POST');
            req.error(new ErrorEvent('TEST_ERROR'));
        });
    });

    describe('updatePost$', () => {
        it('should return a post by slug', () => {
            blogService
                .updatePost$(new MockPost(), new MockUpdatePostPayload())
                .subscribe(response => {
                    expect(response).toBeTruthy();
                });
            const req = httpTestingController.expectOne(
                'http://localhost:8200/api/latest/posts/00000000-0000-0000-0000-000000000001'
            );
            expect(req.request.method).toEqual('PUT');
            req.flush(new MockPost());
        });
        it('should handle errors', () => {
            blogService
                .updatePost$(new MockPost(), new MockUpdatePostPayload())
                .pipe(
                    catchError((error: Error) => {
                        expect(error).toBeDefined();
                        return of();
                    })
                )
                .subscribe(response => {});
            const req = httpTestingController.expectOne(
                'http://localhost:8200/api/latest/posts/00000000-0000-0000-0000-000000000001'
            );
            expect(req.request.method).toEqual('PUT');
            req.error(new ErrorEvent('TEST_ERROR'));
        });
    });

    describe('deletePost$', () => {
        it('should return a post by slug', () => {
            blogService.deletePost$('00000000-0000-0000-0000-000000000001').subscribe(response => {
                expect(response).toBeTruthy();
            });
            const req = httpTestingController.expectOne(
                'http://localhost:8200/api/latest/posts/00000000-0000-0000-0000-000000000001'
            );
            expect(req.request.method).toEqual('DELETE');
            req.flush(new MockPost());
        });
        it('should handle errors', () => {
            blogService
                .deletePost$('00000000-0000-0000-0000-000000000001')
                .pipe(
                    catchError((error: Error) => {
                        expect(error).toBeDefined();
                        return of();
                    })
                )
                .subscribe(response => {});
            const req = httpTestingController.expectOne(
                'http://localhost:8200/api/latest/posts/00000000-0000-0000-0000-000000000001'
            );
            expect(req.request.method).toEqual('DELETE');
            req.error(new ErrorEvent('TEST_ERROR'));
        });
    });
});
