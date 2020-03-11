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
        component: blogContainers.HomeComponent,
    },
    {
        path: 'about',
        component: blogContainers.AboutComponent,
    },
    {
        path: 'new',
        component: blogContainers.NewPostComponent,
    },
    {
        path: 'edit/:post',
        component: blogContainers.EditPostComponent,
    },
    {
        path: ':post',
        canActivate: [blogGuards.PostGuard],
        component: blogContainers.PostComponent,
    },
];

@NgModule({
    imports: [BlogModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class BlogRoutingModule {}
