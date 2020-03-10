import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class ModalServiceStub {
    _resultValue!: string;

    constructor() {}

    open() {
        return {
            result: {
                then: (result: (result: string) => void, reason: () => void) => {
                    result(this._resultValue);
                    reason();
                },
            },
        };
    }

    set resultValue(value: string) {
        this._resultValue = value;
    }
}
