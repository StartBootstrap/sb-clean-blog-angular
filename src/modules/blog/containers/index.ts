import { AboutComponent } from './about/about.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { HomeComponent } from './home/home.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponent } from './post/post.component';

export const containers = [
    HomeComponent,
    PostComponent,
    AboutComponent,
    NewPostComponent,
    EditPostComponent,
];

export * from './home/home.component';
export * from './post/post.component';
export * from './about/about.component';
export * from './new-post/new-post.component';
export * from './edit-post/edit-post.component';
