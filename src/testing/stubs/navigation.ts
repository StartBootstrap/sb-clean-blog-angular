import { SBRouteData } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { of } from 'rxjs';

export const NavigationServiceStub: Partial<NavigationService> = {
    routeData$: () => of({} as SBRouteData),
    currentURL$: () => of('TEST_CURRENT_URL'),
    currentComponent$: () => of('TEST_CURRENT_COMPONENT'),
};
