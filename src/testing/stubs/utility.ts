import { UtilityService } from '@common/services';
import { of } from 'rxjs';

export class UtilityServiceStub implements Partial<UtilityService> {
    _window = window;
    version$ = of('VERSION');
    get window() {
        return this._window;
    }
    localStorage = ({
        getItem: () => {},
        setItem: () => {},
        removeItem: () => {},
    } as unknown) as Storage;
    getStoredObject = <T>(objectName: string) => undefined;
    storeObject = (objectName: string, objectToStore: {}) => {};
}
