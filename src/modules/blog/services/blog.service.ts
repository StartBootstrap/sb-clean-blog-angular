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
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class BlogService {
    private posts: Post[];

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private router: Router
    ) {
        this.posts = [
            {
                id: 'myID',
                body:
                    '# Heading level 1 \n\n\n\n ## Sed ut perspiciatis unde omnis iste natus error sit voluptatem\n\naccusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit\n\n ## Qui in ea voluptate \nvelit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                heading: 'Good heading',
                subHeading: 'Some explanation while reading this',
                backgroundImage: 'https://startbootstrap.com/assets/img/sb-logo.svg',
                meta: 'some meta',
                slug: '/post/myID',
            } as Post,
        ];
    }

    getPosts$(): Observable<Post[]> {
        // TODO put back HTTP calls
        // return this.http
        //     .get<ResultsPost[]>(`${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts`)
        //     .pipe(
        //         map((posts: ResultsPost[]) =>
        //             (posts as Post[]).map((post) => {
        //                 return post;
        //             })
        //         )
        //     );
        return of(this.posts);
    }

    getPost$(postSlug: string): Observable<Post | null> {
        // TODO put back HTTP calls
        // const params = new HttpParams().set('findBy', 'slug');
        // return this.http
        //     .get<ResultsPost>(
        //         `${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts/${postSlug}`,
        //         {
        //             params,
        //         }
        //     )
        //     .pipe(map((post) => post as Post));

        const target = this.posts.find((p: Post) => p.slug === `/post/${postSlug}`);
        return of(target !== undefined ? target : null);
    }

    createPost$(payload: CreatePostPayload): Observable<Post | Error> {
        return this.http
            .post<ResultsPost>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts`,
                payload
            )
            .pipe(
                tap((response) => this.router.navigate([`/${response.slug}`])),
                map((post) => post as Post)
            );
    }

    updatePost$(post: Post, payload: UpdatePostPayload): Observable<undefined | Error> {
        return this.http
            .put<undefined>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts/${post.id}`,
                payload
            )
            .pipe(tap((response) => this.router.navigate([`/${post.slug}`])));
    }

    deletePost$(id: UUID): Observable<undefined | Error> {
        return this.http
            .delete<undefined>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts/${id}`
            )
            .pipe(tap((response) => this.router.navigate([`/`])));
    }
}
