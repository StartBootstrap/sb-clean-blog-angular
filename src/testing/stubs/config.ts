import { Config } from '@common/models';
import { ConfigService } from '@modules/app-common/services';
import { MockConfig } from '@testing/mocks/config';

export class ConfigServiceStub implements Partial<ConfigService> {
    config!: Config;

    loadConfig() {
        this.config = new MockConfig();
        return Promise.resolve(this.config);
    }
}
