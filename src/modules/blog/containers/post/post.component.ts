import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '@modules/blog/models';
import { BlogService } from '@modules/blog/services';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'sb-post',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './post.component.html',
    styleUrls: ['post.component.scss'],
})
export class PostComponent implements OnInit {
    post$!: Observable<Post | null>;
    post!: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private blogService: BlogService
    ) {}
    ngOnInit() {
        this.post$ = this.route.paramMap.pipe(
            tap((params: ParamMap) => (this.post = params.get('post') as string)),
            switchMap((params: ParamMap) => this.blogService.getPost$(params.get('post') as string))
        );
    }
    editPost() {
        this.router.navigateByUrl(`/edit/${this.post}`);
    }
}
