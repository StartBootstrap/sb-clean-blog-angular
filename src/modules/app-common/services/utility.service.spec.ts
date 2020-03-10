import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
    let utilityService: UtilityService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UtilityService],
        });

        utilityService = TestBed.inject(UtilityService);

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    describe('handle', () => {
        it('should storeObject', () => {
            const TEST = { a: 1 };
            spyOn(utilityService.localStorage, 'setItem');
            utilityService.storeObject('test', TEST);
            expect(utilityService.localStorage.setItem).toHaveBeenCalledWith('test', '{"a":1}');
        });
        it('should getStoredObject', () => {
            spyOn(utilityService.localStorage, 'getItem').and.callFake(() => '{"b":2}');
            expect({ ...utilityService.getStoredObject('test') }).toEqual({ b: 2 });
            expect(utilityService.localStorage.getItem).toHaveBeenCalledWith('test');
        });
        it('should return undefined if there is no string in local storage', () => {
            spyOn(utilityService.localStorage, 'getItem').and.callFake(() => null);
            expect(utilityService.getStoredObject('test')).toBeUndefined();
            expect(utilityService.localStorage.getItem).toHaveBeenCalledWith('test');
        });
        it('should return version', () => {
            utilityService.version$.pipe(take(1)).subscribe(response => {
                expect(response).toEqual('a.b.c');
            });

            const req = httpTestingController.expectOne('/assets/version');
            expect(req.request.method).toEqual('GET');

            req.flush('a.b.c');
            httpTestingController.verify();
        });
    });
});
