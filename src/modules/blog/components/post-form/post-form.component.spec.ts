import { Component, DebugElement, NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlogService } from '@modules/blog/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockPost, MockPostFormValue, Post } from '@testing/mocks';
import { BlogServiceStub, ModalServiceStub } from '@testing/stubs';
import { of } from 'rxjs';

import { PostFormComponent } from './post-form.component';

@Component({
    template: `
        <sb-post-form [post]="post"></sb-post-form>
    `,
})
class TestHostComponent {
    post!: Post;
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
    let modalService: NgbModal;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, PostFormComponent],
            imports: [NoopAnimationsModule],
            providers: [
                FormBuilder,
                { provide: BlogService, useValue: BlogServiceStub },
                { provide: NgbModal, useValue: new ModalServiceStub() },
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
        modalService = TestBed.inject(NgbModal);

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sb-post-form')).toEqual(jasmine.anything());
    });

    it('should set the post for edit if passed in', () => {
        spyOn(component.newPostForm, 'setValue');
        hostComponent.post = new MockPost();
        fixture.detectChanges();
        component.ngOnInit();
        expect(component.newPostForm.setValue).toHaveBeenCalled();
    });

    describe('onSubmit', () => {
        it('should create a blog post', () => {
            spyOn(blogService, 'createPost$').and.callFake(() => of({} as Post));
            component.newPostForm.setValue(new MockPostFormValue());
            component.onSubmit();
            expect(blogService.createPost$).toHaveBeenCalled();
        });
        it('should update a blog post', () => {
            hostComponent.post = new MockPost();
            fixture.detectChanges();
            component.ngOnInit();
            spyOn(blogService, 'updatePost$').and.callFake(() => of(undefined));
            component.newPostForm.setValue(new MockPostFormValue());
            component.onSubmit();
            expect(blogService.updatePost$).toHaveBeenCalled();
        });
        it('should NOT submit it form in INVALID', () => {
            spyOn(blogService, 'createPost$').and.callFake(() => of({} as Post));
            spyOn(blogService, 'updatePost$').and.callFake(() => of(undefined));
            component.onSubmit();
            expect(blogService.createPost$).not.toHaveBeenCalled();
            expect(blogService.updatePost$).not.toHaveBeenCalled();
        });
    });

    it('should deletePost', () => {
        hostComponent.post = new MockPost();
        fixture.detectChanges();
        component.ngOnInit();
        spyOn(blogService, 'deletePost$').and.callFake(() => of(undefined));
        component.deletePost();
        expect(blogService.deletePost$).toHaveBeenCalled();
    });

    it('should show delete warning modal', () => {
        spyOn(modalService, 'open').and.callThrough();
        component.open({} as TemplateRef<unknown>);
        expect(modalService.open).toHaveBeenCalled();
    });

    it('should delete post if confirmed', () => {
        spyOn(component, 'deletePost');
        ((modalService as unknown) as ModalServiceStub).resultValue = 'CONFIRM';
        component.open({} as TemplateRef<unknown>);
        expect(component.deletePost).toHaveBeenCalled();
    });

    describe('Accessor Methods', () => {
        it('should test headingControl', () => {
            component.newPostForm.controls.heading.markAsTouched();
            expect(component.headingControlValid).toBeFalsy();
            expect(component.headingControlInvalid).toBeTruthy();
            component.newPostForm.controls.heading.setValue('TEST_HEADING');
            expect(component.headingControlValid).toBeTruthy();
            expect(component.headingControlInvalid).toBeFalsy();
        });
        it('should test subHeadingControl', () => {
            component.newPostForm.controls.subHeading.markAsTouched();
            expect(component.subHeadingControlValid).toBeFalsy();
            expect(component.subHeadingControlInvalid).toBeTruthy();
            component.newPostForm.controls.subHeading.setValue('TEST_HEADING');
            expect(component.subHeadingControlValid).toBeTruthy();
            expect(component.subHeadingControlInvalid).toBeFalsy();
        });
        it('should test backgroundImageControl', () => {
            component.newPostForm.controls.backgroundImage.markAsTouched();
            expect(component.backgroundImageControlValid).toBeFalsy();
            expect(component.backgroundImageControlInvalid).toBeTruthy();
            component.newPostForm.controls.backgroundImage.setValue('TEST_HEADING');
            expect(component.backgroundImageControlValid).toBeTruthy();
            expect(component.backgroundImageControlInvalid).toBeFalsy();
        });
        it('should test bodyControl', () => {
            component.newPostForm.controls.body.markAsTouched();
            expect(component.bodyControlValid).toBeFalsy();
            expect(component.bodyControlInvalid).toBeTruthy();
            component.newPostForm.controls.body.setValue('TEST_HEADING');
            expect(component.bodyControlValid).toBeTruthy();
            expect(component.bodyControlInvalid).toBeFalsy();
        });
    });
});
