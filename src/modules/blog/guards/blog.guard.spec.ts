import { TestBed } from '@angular/core/testing';

import { BlogGuard } from './blog.guard';

describe('_Template Module Guards', () => {
    let blogGuard: BlogGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [BlogGuard],
        });
        blogGuard = TestBed.get(BlogGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            blogGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
