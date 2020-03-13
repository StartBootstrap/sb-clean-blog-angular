import { Config } from '@common/models';

export class MockConfig implements Config {
    sbCleanBlogNodeURL = 'http://localhost:8200';
    demoEnabled = false;
}
