import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@common/services';
import { Post } from '@modules/blog/models';
import { ResultsPost } from '@start-bootstrap/sb-clean-blog-shared-types';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BlogService {
    constructor(private http: HttpClient, private configService: ConfigService) {}

    getPosts$(): Observable<Post[]> {
        return this.http
            .get<ResultsPost[]>(`${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts`)
            .pipe(
                map(posts =>
                    (posts as Post[]).map(post => {
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
        const params = new HttpParams().set('findBy', 'slug');
        return this.http
            .get<ResultsPost>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts/${postSlug}`,
                {
                    params,
                }
            )
            .pipe(
                map(post => post as Post),
                catchError((error: Error) => {
                    console.log(error);
                    // Have to return this in order to not freeze app when redirecting from interceptor
                    return [];
                })
            );
    }
}
