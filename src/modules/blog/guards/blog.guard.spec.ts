import { TestBed } from '@angular/core/testing';
import { BlogService } from '@modules/blog/services';
import { BlogServiceStub } from '@testing/stubs';

import { PostGuard } from './blog.guard';

describe('Blog Module Guards', () => {
    let blogGuard: PostGuard;
    let blogService: BlogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [PostGuard, { provide: BlogService, useValue: BlogServiceStub }],
        });
        blogGuard = TestBed.inject(PostGuard);
        blogService = TestBed.inject(BlogService);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            // blogGuard.canActivate().subscribe(response => {
            //     expect(response).toEqual(true);
            // });
        });
    });
});
