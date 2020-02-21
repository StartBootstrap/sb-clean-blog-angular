import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class BlogService {
    constructor() {}

    getBlog$(): Observable<{}> {
        return of({});
    }

}
