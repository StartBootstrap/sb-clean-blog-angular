import { AppCommonService } from './app-common.service';
import { ConfigService } from './config.service';
import { PrismService } from './prism.service';
import { UtilityService } from './utility.service';

export const services = [AppCommonService, ConfigService, PrismService, UtilityService];

export * from './app-common.service';
export * from './config.service';
export * from './prism.service';
export * from './utility.service';
