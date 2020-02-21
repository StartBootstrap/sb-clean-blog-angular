import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'sb-clean-blog-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './clean-blog-header.component.html',
    styleUrls: ['clean-blog-header.component.scss'],
})
export class CleanBlogHeaderComponent implements OnInit {
    @Input() backgroundImage!: string;
    @Input() heading!: string;
    @Input() subHeading!: string;
    @Input() meta!: string;
    @Input() siteHeading = false;

    safeBackgroudImage!: SafeStyle;

    constructor(private domSanitizer: DomSanitizer) {}
    ngOnInit() {
        this.safeBackgroudImage = this.domSanitizer.bypassSecurityTrustStyle(this.backgroundImage);
    }
}
