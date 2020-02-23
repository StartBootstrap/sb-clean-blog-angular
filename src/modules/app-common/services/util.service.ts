import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    parse: JSON['parse'];
    stringify: JSON['stringify'];
    localStorage: Storage;

    constructor() {
        this.parse = JSON.parse;
        this.stringify = JSON.stringify;
        this.localStorage = localStorage;
    }

    getStoredObject<T>(objectName: string): T | undefined {
        const objectString = this.localStorage.getItem(objectName);
        if (!objectString) {
            return undefined;
        }
        return this.parse(objectString) as T;
    }

    storeObject(objectName: string, objectToStore: {}): void {
        this.localStorage.setItem(objectName, this.stringify(objectToStore));
    }
}
