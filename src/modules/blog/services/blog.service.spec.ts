import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';

describe('BlogService', () => {
    let blogService: BlogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BlogService],
        });
        blogService = TestBed.get(BlogService);
    });

    describe('getBlog$', () => {
        it('should return Observable<Blog>', () => {
            blogService.getBlog$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
