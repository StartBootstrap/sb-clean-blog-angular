import { Injectable } from '@angular/core';
import Marked from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-pug';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';

@Injectable()
export class PrismService {
    Marked: typeof Marked;
    Prism: typeof Prism;

    constructor() {
        this.Marked = Marked;
        this.Prism = Prism;
    }
}
