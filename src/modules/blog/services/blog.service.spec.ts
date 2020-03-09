import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { ConfigServiceStub, RouterStub } from '@testing/stubs';

import { BlogService } from './blog.service';

describe('BlogService', () => {
    let blogService: BlogService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let router: Router;

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
    });

    // httpClient = TestBed.inject(HttpClient);
    // httpTestingController = TestBed.inject(HttpTestingController);
    // router = TestBed.inject(Router);

    describe('getBlog$', () => {
        it('should return Observable<Blog>', () => {
            // blogService.getBlog$().subscribe(response => {
            //     expect(response).toEqual({});
            // });
        });
    });
});
