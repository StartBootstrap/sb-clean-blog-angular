import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@modules/auth/services';
import { AuthServiceStub } from '@testing/stubs';

import { LoginComponent } from './login.component';

@Component({
    template: `
        <sb-login [someInput]="someInput" (someFunction)="someFunction($event)"></sb-login>
    `,
})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

describe('LoginComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: LoginComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, LoginComponent],
            imports: [NoopAnimationsModule],
            providers: [FormBuilder, { provide: AuthService, useValue: AuthServiceStub }],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        hostComponentDE = fixture.debugElement;
        hostComponentNE = hostComponentDE.nativeElement;

        componentDE = hostComponentDE.children[0];
        component = componentDE.componentInstance;
        componentNE = componentDE.nativeElement;

        authService = TestBed.inject(AuthService);

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sb-login')).toEqual(jasmine.anything());
    });
});
