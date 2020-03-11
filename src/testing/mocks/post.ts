import { Post } from '@modules/blog/models';
import { CreatePostPayload, UpdatePostPayload } from '@start-bootstrap/sb-clean-blog-shared-types';
export { Post };

export class MockPost implements Post {
    id = '00000000-0000-0000-0000-000000000001';
    slug = 'TEST_SLUG';
    backgroundImage = 'url("TEST_BACKGROUND_IMAGE")';
    heading = 'TEST_HEADING';
    subHeading = 'TEST_SUB_HEADING';
    meta = 'TEST_META';
    body = 'TEST_BODY';
}

export class MockPostFormValue {
    backgroundImage = 'url("TEST_BACKGROUND_IMAGE")';
    heading = 'TEST_HEADING';
    subHeading = 'TEST_SUB_HEADING';
    body = 'TEST_BODY';
}

export class MockCreatePostPayload implements CreatePostPayload {
    slug = 'TEST_SLUG';
    backgroundImage = 'TEST_BACKGROUND_IMAGE';
    heading = 'TEST_HEADING';
    subHeading = 'TEST_SUB_HEADING';
    meta = 'TEST_META';
    body = 'TEST_BODY';
}

export class MockUpdatePostPayload implements UpdatePostPayload {
    backgroundImage = 'TEST_BACKGROUND_IMAGE';
    heading = 'TEST_HEADING';
    subHeading = 'TEST_SUB_HEADING';
    meta = 'TEST_META';
    body = 'TEST_BODY';
}
