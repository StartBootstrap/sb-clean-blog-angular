import { Injectable } from '@angular/core';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-pug';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';

@Injectable()
export class PrismService {
    Marked: typeof marked; // TODO check this
    Prism: typeof Prism;

    constructor() {
        this.Marked = marked; // TODO check this
        this.Prism = Prism;
    }
}
