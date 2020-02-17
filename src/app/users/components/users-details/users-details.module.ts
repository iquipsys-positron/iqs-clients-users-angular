import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
} from '@angular/material';
import { MatProgressBarModule, MatButtonToggleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { PipPictureModule, PipCollageModule } from 'pip-webui2-pictures';
import { PipActionListModule, PipButtonToggleGroupModule } from 'pip-webui2-buttons';
import { PipDocumentLayoutModule, PipMediaModule, PipShadowModule } from 'pip-webui2-layouts';
import { PipEmptyStateModule } from 'pip-webui2-controls';

import { UsersDetailsComponent } from './users-details.component';
import { PipInfiniteScrollModule } from 'pip-webui2-behaviors';


@NgModule({
    declarations: [
        UsersDetailsComponent
    ],
    imports: [
        PipDocumentLayoutModule,
        PipMediaModule,
        PipShadowModule,
        PipButtonToggleGroupModule,

        FlexLayoutModule,

        TranslateModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,

        MatTabsModule,
        MatIconModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatInputModule,
        MatSelectModule,
        MatProgressBarModule,
        PipPictureModule,
        PipActionListModule,
        PipCollageModule,
        PipInfiniteScrollModule,

        PipEmptyStateModule
    ],
    exports: [
        UsersDetailsComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersDetailsModule { }
