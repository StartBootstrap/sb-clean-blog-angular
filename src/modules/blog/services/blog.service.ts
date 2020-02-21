import { Injectable } from '@angular/core';
import { Post } from '@modules/blog/models';
import { Observable, of } from 'rxjs';

@Injectable()
export class BlogService {
    constructor() {}

    getPosts$(): Observable<Post[]> {
        return of([
            {
                id: 'postaheading',
                slug: 'post-a-heading',
                backgroundImage: 'url("assets/img/post-bg.jpg")',
                heading: 'How to do a Post A heading in this day and age',
                subHeading: 'Post A subHeading that needs to be a little longer',
                meta: 'Post A meta',
                body: 'Post A body',
            },
            {
                id: 'postbheading',
                slug: 'post-b-heading',
                backgroundImage: 'url("assets/img/post-bg.jpg")',
                heading: 'How to do a Post B heading in this day and age',
                subHeading: 'Post B subHeading that needs to be a little longer',
                meta: 'Post B meta',
                body: 'Post B body',
            },
            {
                id: 'postcheading',
                slug: 'post-c-heading',
                backgroundImage: 'url("assets/img/post-bg.jpg")',
                heading: 'How to do a Post C heading in this day and age',
                subHeading: 'Post C subHeading that needs to be a little longer',
                meta: 'Post C meta',
                body: 'Post C body',
            },
            {
                id: 'postdheading',
                slug: 'post-d-heading',
                backgroundImage: 'url("assets/img/post-bg.jpg")',
                heading: 'How to do a Post D heading in this day and age',
                subHeading: 'Post D subHeading that needs to be a little longer',
                meta: 'Post D meta',
                body: 'Post D body',
            },
            {
                id: 'posteheading',
                slug: 'post-e-heading',
                backgroundImage: 'url("assets/img/post-bg.jpg")',
                heading: 'How to do a Post E heading in this day and age',
                subHeading: 'Post E subHeading that needs to be a little longer',
                meta: 'Post E meta',
                body: 'Post E body',
            },
            {
                id: 'postfheading',
                slug: 'post-f-heading',
                backgroundImage: 'url("assets/img/post-bg.jpg")',
                heading: 'How to do a Post F heading in this day and age',
                subHeading: 'Post F subHeading that needs to be a little longer',
                meta: 'Post F meta',
                body: 'Post F body',
            },
        ]);
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
