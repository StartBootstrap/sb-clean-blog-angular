/* tslint:disable: ordered-imports*/
import { NgModule, APP_INITIALIZER, ModuleWithProviders, SecurityContext } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Config } from '@common/models';

/* Third Party */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@modules/icons/icons.module';

const thirdParty = [IconsModule, NgbModule];

import { MarkdownModule } from 'ngx-markdown';

/* Containers */
import * as appCommonContainers from './containers';

/* Components */
import * as appCommonComponents from './components';

/* Guards */
import * as appCommonGuards from './guards';

/* Services */
import * as appCommonServices from './services';
import * as authServices from '@modules/auth/services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ...thirdParty,
        MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    ],
    providers: [...appCommonServices.services, ...authServices.services, ...appCommonGuards.guards],
    declarations: [...appCommonContainers.containers, ...appCommonComponents.components],
    exports: [...appCommonContainers.containers, ...appCommonComponents.components, ...thirdParty],
})
export class AppCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppCommonModule,
            providers: [
                ...appCommonServices.services,
                ...appCommonGuards.guards,
                ...authServices.services,
                {
                    provide: APP_INITIALIZER,
                    useFactory: configServiceFactory,
                    multi: true,
                    deps: [appCommonServices.ConfigService, appCommonServices.PrismService],
                },
            ],
        };
    }
}

export function configServiceFactory(
    configService: appCommonServices.ConfigService
): () => Promise<Config> {
    return () => configService.loadConfig();
}
