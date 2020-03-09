import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
// import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
    let configService: ConfigService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConfigService],
        });

        configService = TestBed.inject(ConfigService);

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    describe('handle', () => {
        it('should show error message in toastr', () => {
            // spyOn(toastrService, 'error');
            // errorService.handle(new Error('TEST_ERROR'), 'TEST_TITLE');
            // expect(toastrService.error).toHaveBeenCalledWith('TEST_ERROR', 'TEST_TITLE');
        });
    });
});
