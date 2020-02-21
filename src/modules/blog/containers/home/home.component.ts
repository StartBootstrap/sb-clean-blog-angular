import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '@modules/blog/models';
import { BlogService } from '@modules/blog/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();

    posts!: Post[];
    constructor(private blogService: BlogService) {}
    ngOnInit() {
        this.subscription.add(
            this.blogService.getPosts$().subscribe(posts => {
                this.posts = posts;
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
