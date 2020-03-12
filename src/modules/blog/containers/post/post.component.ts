import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthUtilsService } from '@modules/auth/services';
import { Post } from '@modules/blog/models';
import { BlogService } from '@modules/blog/services';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'sb-post',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './post.component.html',
    styleUrls: ['post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
    static id = 'PostComponent';

    subscription: Subscription = new Subscription();
    isLoggedIn = false;
    post$!: Observable<Post | null>;
    post!: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private blogService: BlogService,
        private authUtilsService: AuthUtilsService
    ) {}

    ngOnInit() {
        this.post$ = this.route.paramMap.pipe(
            tap((params: ParamMap) => (this.post = params.get('post') as string)),
            switchMap((params: ParamMap) => this.blogService.getPost$(params.get('post') as string))
        );
        this.subscription.add(
            this.authUtilsService.isLoggedIn$().subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    editPost() {
        this.router.navigateByUrl(`/edit/${this.post}`);
    }
}
