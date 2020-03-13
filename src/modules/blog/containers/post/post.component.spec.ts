import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUtilsService } from '@modules/auth/services';
import { BlogService } from '@modules/blog/services';
import {
    ActivatedRouteStub,
    AuthUtilsServiceStub,
    BlogServiceStub,
    RouterStub,
} from '@testing/stubs';

import { PostComponent } from './post.component';

@Component({
    template: `
        <sb-post [someInput]="someInput" (someFunction)="someFunction($event)"></sb-post>
    `,
})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

describe('PostComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: PostComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let router: Router;
    let blogService: BlogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, PostComponent],
            imports: [NoopAnimationsModule],
            providers: [
                { provide: ActivatedRoute, useValue: new ActivatedRouteStub({}) },
                { provide: Router, useValue: new RouterStub() },
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

        router = TestBed.inject(Router);
        blogService = TestBed.inject(BlogService);

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sb-post')).toEqual(jasmine.anything());
    });

    it('should editPost', () => {
        spyOn(router, 'navigateByUrl');
        component.editPost();
        expect(router.navigateByUrl).toHaveBeenCalled();
    });
});
