import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '@modules/blog/services';
import { ActivatedRouteStub, BlogServiceStub } from '@testing/stubs';

import { EditPostComponent } from './edit-post.component';

@Component({
    template: `
        <sb-edit-post [someInput]="someInput" (someFunction)="someFunction($event)"></sb-edit-post>
    `,
})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

describe('EditPostComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: EditPostComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let blogService: BlogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, EditPostComponent],
            imports: [NoopAnimationsModule],
            providers: [
                { provide: ActivatedRoute, useValue: new ActivatedRouteStub({}) },
                { provide: BlogService, useValue: BlogServiceStub },
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
        expect(hostComponentNE.querySelector('sb-edit-post')).toEqual(jasmine.anything());
    });
});
