import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-new-post',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './new-post.component.html',
    styleUrls: ['new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
