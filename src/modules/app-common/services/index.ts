import { AppCommonService } from './app-common.service';
import { ConfigService } from './config.service';

export const services = [AppCommonService, ConfigService];

export * from './app-common.service';
export * from './config.service';
