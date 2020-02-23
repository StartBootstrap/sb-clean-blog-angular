import { AppCommonService } from './app-common.service';
import { ConfigService } from './config.service';
import { PrismService } from './prism.service';
import { UtilService } from './util.service';

export const services = [AppCommonService, ConfigService, PrismService, UtilService];

export * from './app-common.service';
export * from './config.service';
export * from './prism.service';
export * from './util.service';
