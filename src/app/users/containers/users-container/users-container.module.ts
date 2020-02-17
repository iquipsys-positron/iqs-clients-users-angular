import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
    MatButtonModule,
    MatIconModule, 
    MatDialogModule, 
    MatProgressBarModule, 
    MatSnackBarModule,
    MatInputModule,
 } from '@angular/material';
import { MatListModule, MatSlideToggleModule, MatTabsModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';

import { PipEmptyStateModule } from 'pip-webui2-controls';
import {
    PipAppbarModule,
    PipRightnavModule,
    PipMediaModule,
    PipSidenavModule,
    PipMenuLayoutModule,
    PipShadowModule,
    PipDocumentLayoutModule,    
  } from 'pip-webui2-layouts';
import { PipThemesModule } from 'pip-webui2-themes';
import { IqsAskDialogModule, IqsAskDialogComponent } from 'iqs-libs-clientshell2-angular'

import { UsersContainerComponent } from './users-container.component';
import { UsersDetailsModule } from '../../components/users-details/users-details.module';
import { UsersListModule } from '../../components/users-list/users-list.module';
import { UsersEffects } from '../../store/users.effects';
import { UsersReducer, InitialUserState } from '../../store/users.reducer';
import { UsersService } from '../../services/users.service';
import { EditEmailDialogComponent } from '../../components/edit-email-dialog';
import { EditSmsDialogComponent } from '../../components/edit-sms-dialog';
import { ChangePasswordDialogComponent } from '../../components/change-password-dialog';
import { GrantRoleDialogComponent } from '../../components/grant-role-dialog';


@NgModule({
    declarations: [
        UsersContainerComponent,
        EditEmailDialogComponent,
        EditSmsDialogComponent,
        ChangePasswordDialogComponent,
        GrantRoleDialogComponent,
    ],
    entryComponents: [
        IqsAskDialogComponent,
        EditEmailDialogComponent,
        EditSmsDialogComponent,
        ChangePasswordDialogComponent,
        GrantRoleDialogComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        
        TranslateModule.forRoot(),
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatTabsModule,
        MatDialogModule,
        MatInputModule,

        PipThemesModule.forRoot(),
        PipAppbarModule,
        PipRightnavModule.forRoot(),
        PipMediaModule.forRoot(),
        PipSidenavModule.forRoot(),
        PipMenuLayoutModule,
        PipShadowModule,
        PipEmptyStateModule,
        PipDocumentLayoutModule,

        UsersDetailsModule,
        UsersListModule,

        IqsAskDialogModule,

        EffectsModule.forFeature([
            UsersEffects
        ]),
        StoreModule.forFeature(
            'users',
            UsersReducer,
            {
                initialState: InitialUserState
            }
        ),
    ],
    exports: [
        UsersContainerComponent
    ],
    providers: [
        UsersService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersContainerModule { }
