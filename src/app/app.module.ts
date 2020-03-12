import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppCommonModule } from '@common/app-common.module';
import { DemoInterceptor } from '@common/interceptors';
import { UtilityService } from '@common/services';
import { NavigationModule } from '@modules/navigation/navigation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AppCommonModule.forRoot(),
        NavigationModule.forRoot(),
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useFactory: demoInterceptorFactory,
        //     multi: true,
        //     deps: [UtilityService],
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

export function demoInterceptorFactory(utilityServuce: UtilityService) {
    return new DemoInterceptor(utilityServuce);
}
