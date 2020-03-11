import { BlogService } from '@modules/blog/services';
import { MockPost } from '@testing/mocks';
import { of } from 'rxjs';

export const BlogServiceStub: Partial<BlogService> = {
    getPosts$: () => of([new MockPost()]),
    getPost$: () => of(new MockPost()),
    createPost$: () => of(new MockPost()),
    updatePost$: () => of(),
    deletePost$: () => of(),
};
