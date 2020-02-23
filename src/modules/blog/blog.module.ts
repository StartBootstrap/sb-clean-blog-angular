/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MarkdownModule } from 'ngx-markdown';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as blogComponents from './components';

/* Containers */
import * as blogContainers from './containers';

/* Guards */
import * as blogGuards from './guards';

/* Services */
import * as blogServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MarkdownModule.forChild(),
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...blogServices.services, ...blogGuards.guards],
    declarations: [...blogContainers.containers, ...blogComponents.components],
    exports: [...blogContainers.containers, ...blogComponents.components],
})
export class BlogModule {}
