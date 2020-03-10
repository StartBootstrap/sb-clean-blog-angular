import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CardViewDetailsComponent } from './card-view-details.component';

@Component({
    template: `
        <sb-card-view-details [background]="background" [color]="color"></sb-card-view-details>
    `,
})
class TestHostComponent {
    background!: string;
    color!: string;
}

describe('CardViewDetailsComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: CardViewDetailsComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, CardViewDetailsComponent],
            imports: [NoopAnimationsModule],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        hostComponentDE = fixture.debugElement;
        hostComponentNE = hostComponentDE.nativeElement;

        componentDE = hostComponentDE.children[0];
        component = componentDE.componentInstance;
        componentNE = componentDE.nativeElement;

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sb-card-view-details')).toEqual(jasmine.anything());
    });

    it('should push background', () => {
        hostComponent.background = 'bg-primary';
        spyOn(component.customClasses, 'push').and.callThrough();
        fixture.detectChanges();
        component.ngOnInit();
        expect(component.customClasses.push).toHaveBeenCalledWith('bg-primary');
    });

    it('should push color', () => {
        hostComponent.color = 'white';
        spyOn(component.customClasses, 'push').and.callThrough();
        fixture.detectChanges();
        component.ngOnInit();
        expect(component.customClasses.push).toHaveBeenCalledWith('white');
    });
});
