import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, ChildActivationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterStub } from '@testing/stubs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    let component: AppComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let router: RouterStub;
    let titleService: Title;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: Router,
                    useValue: new RouterStub(),
                },
                Title,
            ],
            declarations: [AppComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);

        componentDE = fixture.debugElement.children[0];
        component = componentDE.componentInstance;
        componentNE = componentDE.nativeElement;

        fixture.detectChanges();

        router = (TestBed.inject(Router) as unknown) as RouterStub;
        titleService = TestBed.inject(Title);
    }));

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should have a initial title 'sb-clean-blog-angular'`, () => {
        expect(component.title).toEqual('sb-clean-blog-angular');
    });

    it('should set the default title', () => {
        spyOn(titleService, 'setTitle');
        router.events.next(
            new ChildActivationEnd(({
                firstChild: {
                    firstChild: null,
                    data: {},
                },
            } as unknown) as ActivatedRouteSnapshot)
        );
        expect(titleService.setTitle).toHaveBeenCalledTimes(1);
    });

    it('should set the title from data', () => {
        spyOn(titleService, 'setTitle');
        router.events.next(
            new ChildActivationEnd(({
                firstChild: null,
                data: {
                    title: 'TEST',
                },
            } as unknown) as ActivatedRouteSnapshot)
        );
        expect(titleService.setTitle).toHaveBeenCalledWith('TEST');
    });
});
