import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Post } from '@modules/blog/models';
import { BlogService } from '@modules/blog/services';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-post-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './post-form.component.html',
    styleUrls: ['post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
    @Input() post?: Post;
    newPostForm = this.fb.group({
        heading: ['', [Validators.required]],
        subHeading: ['', [Validators.required]],
        backgroundImage: ['', [Validators.required]],
        body: ['', [Validators.required]],
    });

    // Random unsplash https://source.unsplash.com/1900x1200/

    constructor(
        private fb: FormBuilder,
        private blogService: BlogService,
        private modalService: NgbModal
    ) {}
    ngOnInit() {
        if (this.post) {
            this.newPostForm.setValue({
                heading: this.post.heading,
                subHeading: this.post.subHeading,
                backgroundImage: this.post.backgroundImage.replace(/^url\("(.+)"\)/, '$1'),
                body: this.post.body,
            });
        }
    }

    onSubmit() {
        if (this.newPostForm.status === 'VALID') {
            if (!this.post) {
                this.blogService
                    .createPost$(this.newPostForm.value)
                    .subscribe(response => console.log(response));
            } else {
                this.blogService
                    .updatePost$(this.post, this.newPostForm.value)
                    .subscribe(response => console.log(response));
            }
        }

        // tslint:disable-next-line: forin
        for (const key in this.newPostForm.controls) {
            const control = this.newPostForm.controls[key];
            control.markAllAsTouched();
        }
    }

    deletePost() {
        this.blogService
            .deletePost$((this.post as Post).id)
            .subscribe(response => console.log(response));
    }

    open(content: TemplateRef<unknown>, modalOptions: NgbModalOptions = {}) {
        this.modalService.open(content, modalOptions).result.then(
            result => {
                if (result === 'CONFIRM') {
                    this.deletePost();
                }
            },
            reason => {}
        );
    }

    /* Accessor Methods */

    // heading
    get headingControl() {
        return this.newPostForm.get('heading') as FormControl;
    }

    get headingControlValid() {
        return this.headingControl.touched && !this.headingControlInvalid;
    }

    get headingControlInvalid() {
        return (
            this.headingControl.touched &&
            (this.headingControl.hasError('required') || this.headingControl.hasError('heading'))
        );
    }

    // subHeading
    get subHeadingControl() {
        return this.newPostForm.get('subHeading') as FormControl;
    }

    get subHeadingControlValid() {
        return this.subHeadingControl.touched && !this.subHeadingControlInvalid;
    }

    get subHeadingControlInvalid() {
        return (
            this.subHeadingControl.touched &&
            (this.subHeadingControl.hasError('required') ||
                this.subHeadingControl.hasError('subHeading'))
        );
    }

    // backgroundImage
    get backgroundImageControl() {
        return this.newPostForm.get('backgroundImage') as FormControl;
    }

    get backgroundImageControlValid() {
        return this.backgroundImageControl.touched && !this.backgroundImageControlInvalid;
    }

    get backgroundImageControlInvalid() {
        return (
            this.backgroundImageControl.touched &&
            (this.backgroundImageControl.hasError('required') ||
                this.backgroundImageControl.hasError('backgroundImage'))
        );
    }

    // body
    get bodyControl() {
        return this.newPostForm.get('body') as FormControl;
    }

    get bodyControlValid() {
        return this.bodyControl.touched && !this.bodyControlInvalid;
    }

    get bodyControlInvalid() {
        return (
            this.bodyControl.touched &&
            (this.bodyControl.hasError('required') || this.bodyControl.hasError('body'))
        );
    }
}
