import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services';

// slug = 'TEST_SLUG';
// backgroundImage = 'TEST_BACKGROUND_IMAGE';
// heading = 'TEST_HEADING';
// subHeading = 'TEST_SUB_HEADING';
// meta = 'TEST_META';
// body = 'TEST_BODY';

@Component({
    selector: 'sb-new-post',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './new-post.component.html',
    styleUrls: ['new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
    newPostForm = this.fb.group({
        heading: ['', [Validators.required]],
        subHeading: ['', [Validators.required]],
        backgroundImage: ['', [Validators.required]],
        body: ['', [Validators.required]],
    });

    // Random unsplash https://source.unsplash.com/1900x1200/

    constructor(private fb: FormBuilder, private authService: AuthService) {}
    ngOnInit() {}

    onSubmit() {
        if (this.newPostForm.status === 'VALID') {
            // this.authService
            //     .login$({
            //         email: this.newPostForm.value.email,
            //         password: this.newPostForm.value.password,
            //     })
            //     .subscribe(response => console.log(response));
        }

        for (const key in this.newPostForm.controls) {
            if (this.newPostForm.controls.hasOwnProperty(key)) {
                const control = this.newPostForm.controls[key];
                control.markAllAsTouched();
            }
        }
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
