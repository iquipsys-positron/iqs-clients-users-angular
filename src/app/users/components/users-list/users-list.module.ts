import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
} from '@angular/material';
import { MatProgressBarModule } from '@angular/material';

import { PipDocumentLayoutModule, PipMediaModule, PipShadowModule, PipScrollableModule } from 'pip-webui2-layouts';
import { PipEmptyStateModule, PipRefItemModule, PipSearchInputModule } from 'pip-webui2-controls';
import { PipSelectedModule, PipInfiniteScrollModule } from 'pip-webui2-behaviors';

import { UsersListComponent } from './users-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        UsersListComponent
    ],
    imports: [
        PipDocumentLayoutModule,
        PipMediaModule,
        PipShadowModule,

        FormsModule,
        CommonModule,

        FlexLayoutModule,

        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatInputModule,
        MatSelectModule,
        MatProgressBarModule,

        PipEmptyStateModule,
        PipRefItemModule,
        PipSelectedModule,
        PipScrollableModule,
        PipSearchInputModule
    ],
    exports: [
        UsersListComponent
    ],
    providers: [],
})
export class UsersListModule { }
