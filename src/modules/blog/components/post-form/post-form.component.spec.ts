import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlogService } from '@modules/blog/services';
import { BlogServiceStub } from '@testing/stubs';

import { PostFormComponent } from './post-form.component';

@Component({
    template: `
        <sb-post-form [someInput]="someInput" (someFunction)="someFunction($event)"></sb-post-form>
    `,
})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

describe('PostFormComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: PostFormComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let blogService: BlogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, PostFormComponent],
            imports: [NoopAnimationsModule],
            providers: [FormBuilder, { provide: BlogService, useValue: BlogServiceStub }],
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
        expect(hostComponentNE.querySelector('sb-post-form')).toEqual(jasmine.anything());
    });
});
