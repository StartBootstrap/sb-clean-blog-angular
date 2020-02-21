import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-blog',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './blog.component.html',
    styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
