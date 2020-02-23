import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthUtilsService } from '@modules/auth/services';
import { Post } from '@modules/blog/models';
import { BlogService } from '@modules/blog/services';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'sb-post',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './post.component.html',
    styleUrls: ['post.component.scss'],
})
export class PostComponent implements OnInit {
    post$!: Observable<Post | null>;

    constructor(
        private route: ActivatedRoute,
        private blogService: BlogService,
        private authUtilsService: AuthUtilsService
    ) {}
    ngOnInit() {
        this.post$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.blogService.getPost$(params.get('post') as string))
        );
    }
}
