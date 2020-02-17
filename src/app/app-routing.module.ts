import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'iqs-libs-clientshell2-angular';

import { UsersContainerComponent } from './users/containers/users-container/users-container.component';


const appRoutes: Routes = [
    { path: '', component: UsersContainerComponent, canActivate: [AuthGuard] },
    { path: '404', redirectTo: '' },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
