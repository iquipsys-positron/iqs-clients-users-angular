import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IqsShellModule, IqsShellContainerComponent/*, CustomRouterStateSerializer */} from 'iqs-libs-clientshell2-angular';
// import {
//     StoreRouterConnectingModule,
//     RouterStateSerializer,
// } from '@ngrx/router-store';
import { UsersModule } from './users/users.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { UsersDataService } from './users/services/users.data.service';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        IqsShellModule.forRoot(),

        AppRoutingModule,
        UsersModule

    ],
    providers: [
        // {
        //     provide: RouterStateSerializer,
        //     useClass: CustomRouterStateSerializer
        // },
        UsersDataService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [IqsShellContainerComponent]
})
export class AppModule { }
