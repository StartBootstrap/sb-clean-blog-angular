import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthUtilsService } from '@modules/auth/services';
import { BlogService } from '@modules/blog/services';
import { AuthUtilsServiceStub, BlogServiceStub } from '@testing/stubs';

import { HomeComponent } from './home.component';

@Component({
    template: `
        <sb-home [someInput]="someInput" (someFunction)="someFunction($event)"></sb-home>
    `,
})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

describe('HomeComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: HomeComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let blogService: BlogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, HomeComponent],
            imports: [NoopAnimationsModule],
            providers: [
                { provide: BlogService, useValue: BlogServiceStub },
                { provide: AuthUtilsService, useValue: AuthUtilsServiceStub },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        hostComponentDE = fixture.debugElement;
        hostComponentNE = hostComponentDE.nativeElement;

        componentDE = hostComponentDE.children[0];
        component = componentDE.componentInstance;
        componentNE = componentDE.nativeElement;

        blogService = TestBed.inject(BlogService);

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sb-home')).toEqual(jasmine.anything());
    });
});
