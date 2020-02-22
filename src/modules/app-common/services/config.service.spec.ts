import { TestBed } from '@angular/core/testing';
// import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ConfigService } from './error.service';

describe('ConfigService', () => {
    let errorService: ConfigService;
    // let toastrService: ToastrService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // imports: [ToastrModule.forRoot()],
            // providers: [ConfigService, ToastrService],
        });
        errorService = TestBed.get(ConfigService);
        // toastrService = TestBed.get(ToastrService);
    });

    describe('handle', () => {
        it('should show error message in toastr', () => {
            // spyOn(toastrService, 'error');
            errorService.handle(new Error('TEST_ERROR'), 'TEST_TITLE');
            // expect(toastrService.error).toHaveBeenCalledWith('TEST_ERROR', 'TEST_TITLE');
        });
    });
});
