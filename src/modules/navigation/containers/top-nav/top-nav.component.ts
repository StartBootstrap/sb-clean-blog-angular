import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUtilsService } from '@modules/auth/services';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    isLoggedIn = false;
    isOnPost = false;
    isMenuCollapsed = true;

    constructor(
        private navigationService: NavigationService,
        private authUtilsService: AuthUtilsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        this.subscription.add(
            this.navigationService.currentComponent$().subscribe(currentComponentName => {
                this.isOnPost = currentComponentName === 'PostComponent';
            })
        );
        this.subscription.add(
            this.authUtilsService.isLoggedIn$().subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            })
        );

        this.authUtilsService.checkToken();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    editPost() {
        this.router.navigateByUrl(`/edit/${this.route.snapshot.params.post}`);
    }
}
