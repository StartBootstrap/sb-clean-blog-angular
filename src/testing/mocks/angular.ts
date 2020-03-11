import { ActivatedRouteSnapshot } from '@angular/router';

export class ActivatedRouteSnapshotMock implements Partial<ActivatedRouteSnapshot> {
    params = {
        post: 'TEST_POST_PARAM',
    };
}
