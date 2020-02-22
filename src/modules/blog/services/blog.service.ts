import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@common/services';
import { Post } from '@modules/blog/models';
import { ResultsPost } from '@start-bootstrap/sb-clean-blog-shared-types';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BlogService {
    constructor(private http: HttpClient, private configService: ConfigService) {}

    getPosts$(): Observable<Post[]> {
        return this.http
            .get<ResultsPost[]>(`${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts`)
            .pipe(
                map(posts =>
                    posts.map<Post>(post => {
                        return post;
                    })
                ),
                catchError((error: Error) => {
                    console.log(error);
                    // Have to return this in order to not freeze app when redirecting from interceptor
                    return [[]];
                })
            );
    }

    getPost$(postSlug: string): Observable<Post | null> {
        if (postSlug !== 'post-a-heading') {
            return of(null);
        }
        return of({
            id: 'postaheading',
            slug: 'post-a-heading',
            backgroundImage: 'url("assets/img/post-bg.jpg")',
            heading: 'How to do a Post A heading in this day and age',
            subHeading: 'Post A subHeading that needs to be a little longer',
            meta: 'Post A meta',
            body: 'Post A body',
        });
    }
}
