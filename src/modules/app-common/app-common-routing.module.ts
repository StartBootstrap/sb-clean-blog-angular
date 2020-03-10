/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { AppCommonModule } from './app-common.module';

/* Containers */
import * as appCommonContainers from './containers';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: appCommonContainers.VersionComponent,
    },
];

@NgModule({
    imports: [AppCommonModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AppCommonRoutingModule {}
