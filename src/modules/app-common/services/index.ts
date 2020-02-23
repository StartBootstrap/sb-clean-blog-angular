import { AppCommonService } from './app-common.service';
import { ConfigService } from './config.service';
import { PrismService } from './prism.service';

export const services = [AppCommonService, ConfigService, PrismService];

export * from './app-common.service';
export * from './config.service';
export * from './prism.service';
