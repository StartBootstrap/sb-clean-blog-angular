import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '@modules/blog/models';
import { BlogService } from '@modules/blog/services';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'sb-edit-post',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-post.component.html',
    styleUrls: ['edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
    post$!: Observable<Post | null>;

    constructor(private route: ActivatedRoute, private blogService: BlogService) {}
    ngOnInit() {
        this.post$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.blogService.getPost$(params.get('post') as string))
        );
    }
}
