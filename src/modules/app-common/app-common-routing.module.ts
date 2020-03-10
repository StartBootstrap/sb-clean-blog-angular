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
    {
        path: 'version',
        loadChildren: () =>
            import('modules/app-common/app-common-routing.module').then(
                m => m.AppCommonRoutingModule
            ),
    },
];

@NgModule({
    imports: [AppCommonModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AppCommonRoutingModule {}
