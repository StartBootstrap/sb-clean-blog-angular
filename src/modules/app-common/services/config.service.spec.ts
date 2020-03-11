import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockConfig } from '@testing/mocks';

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
        it('should loadConfig', () => {
            const mockConfig = new MockConfig();
            configService.loadConfig();
            const req = httpTestingController.expectOne('assets/config.json');
            expect(req.request.method).toEqual('GET');
            req.flush(mockConfig);
            httpTestingController.verify();
            expect(configService.config).toEqual(mockConfig);
        });
    });
});
