import { UtilityService } from '@modules/utility/services';
import { of } from 'rxjs';

export class UtilityServiceStub implements Partial<UtilityService> {
    get version$() {
        return of('X.X.X');
    }
}
