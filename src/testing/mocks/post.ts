import { Post } from '@modules/blog/models';
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
