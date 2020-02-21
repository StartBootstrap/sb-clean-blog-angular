/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { BlogModule } from './blog.module';

/* Containers */
import * as blogContainers from './containers';

/* Guards */
import * as blogGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: blogContainers.BlogComponent,
        children: [
            {
                path: '',
                component: blogContainers.HomeComponent,
            },
        ],
    },
];

@NgModule({
    imports: [BlogModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class BlogRoutingModule {}
