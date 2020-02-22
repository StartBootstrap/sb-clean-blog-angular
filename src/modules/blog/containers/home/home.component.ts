import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Post } from '@modules/blog/models';
import { BlogService } from '@modules/blog/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'sb-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
    posts$!: Observable<Post[]>;
    constructor(private blogService: BlogService) {}
    ngOnInit() {
        this.posts$ = this.blogService.getPosts$();
    }
}
