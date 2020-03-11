import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BlogService } from '@modules/blog/services';
import { ActivatedRouteSnapshotMock, MockPost } from '@testing/mocks';
import { BlogServiceStub } from '@testing/stubs';
import { of } from 'rxjs';

import { PostGuard } from './blog.guard';

describe('Blog Module Guards', () => {
    let postGuard: PostGuard;
    let blogService: BlogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [PostGuard, { provide: BlogService, useValue: BlogServiceStub }],
        });
        postGuard = TestBed.inject(PostGuard);
        blogService = TestBed.inject(BlogService);
    });

    describe('canActivate', () => {
        it('should activate', () => {
            spyOn(blogService, 'getPost$').and.callFake(() => of(new MockPost()));
            postGuard
                .canActivate(
                    (new ActivatedRouteSnapshotMock() as unknown) as ActivatedRouteSnapshot,
                    {} as RouterStateSnapshot
                )
                .subscribe(response => {
                    expect(response).toEqual(true);
                });
            expect(blogService.getPost$).toHaveBeenCalled();
        });
        it('should not activate', () => {
            spyOn(blogService, 'getPost$').and.callFake(() => of(null));
            postGuard
                .canActivate(
                    (new ActivatedRouteSnapshotMock() as unknown) as ActivatedRouteSnapshot,
                    {} as RouterStateSnapshot
                )
                .subscribe(response => {
                    expect(response).toEqual(false);
                });
            expect(blogService.getPost$).toHaveBeenCalled();
        });
    });
});
