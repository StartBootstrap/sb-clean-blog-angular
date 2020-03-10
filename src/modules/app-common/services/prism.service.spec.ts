import { TestBed } from '@angular/core/testing';

import { PrismService } from './prism.service';

describe('PrismService', () => {
    let prismService: PrismService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [PrismService],
        });

        prismService = TestBed.inject(PrismService);
    });

    describe('handle', () => {
        it('should load Marked and Prism', () => {
            expect(prismService).toBeTruthy();
        });
    });
});
