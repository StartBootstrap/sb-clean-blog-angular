import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { Post } from '@modules/blog/models';
import {
    CreatePostPayload,
    ResultsPost,
    UpdatePostPayload,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class BlogService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private router: Router
    ) {}

    getPosts$(): Observable<Post[]> {
        return this.http
            .get<ResultsPost[]>(`${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts`)
            .pipe(
                map(posts =>
                    (posts as Post[]).map(post => {
                        return post;
                    })
                )
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
            .pipe(map(post => post as Post));
    }

    createPost$(payload: CreatePostPayload): Observable<Post | Error> {
        return this.http
            .post<ResultsPost>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts`,
                payload
            )
            .pipe(
                tap(response => this.router.navigate([`/${response.slug}`])),
                map(post => post as Post)
            );
    }

    updatePost$(post: Post, payload: UpdatePostPayload): Observable<undefined | Error> {
        return this.http
            .put<undefined>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts/${post.id}`,
                payload
            )
            .pipe(tap(response => this.router.navigate([`/${post.slug}`])));
    }

    deletePost$(id: UUID): Observable<undefined | Error> {
        return this.http
            .delete<undefined>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts/${id}`
            )
            .pipe(tap(response => this.router.navigate([`/`])));
    }
}
