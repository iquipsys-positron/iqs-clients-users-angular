import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { IqsSessionConfigService } from 'iqs-libs-clientshell2-angular';
import { TranslateService } from '@ngx-translate/core';

import { UserDetailsTranslations } from './user-details.strings';
import { User, EmailSettings, SmsSettings, Activity, Session } from './../../models';


import * as _ from 'lodash';

@Component({
    selector: 'users-details',
    templateUrl: 'users-details.component.html',
    styleUrls: ['./users-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetailsComponent implements OnInit, OnChanges {

    public blobsUrl: string;
    public currEmailSettings: EmailSettings;
    public currSmsSettings: SmsSettings;
    public currRoles: string[];
    public currActivities: Activity[];
    public currSessions: Session[];
    public UserColor = '#004d40';

    private _currTabIndex: number;

    public currentUser: User = new User();


    @Input() loading = false;
    @Input() error: any = null;

    @Input() set user(val: User) {
        this.currentUser = val;
    }

    @Input() set emailSettings(val: EmailSettings) {
        this.currEmailSettings = val;
    }

    @Input() set smsSettings(val: SmsSettings) {
        this.currSmsSettings = val;
    }

    @Input() set roles(val: string[]) {
        this.currRoles = val;
    }

    @Input() set activities(val: Activity[]) {
        this.currActivities = val;
    }

    @Input() set sessions(val: Session[]) {
        this.currSessions = val;
    }

    @Output() editEmailSettings = new EventEmitter();
    @Output() editSmsSettings = new EventEmitter();
    @Output() lockToogle = new EventEmitter();
    @Output() changePassword = new EventEmitter();
    @Output() grantRole = new EventEmitter();
    @Output() revokeRole = new EventEmitter();
    @Output() loadMoreActivities = new EventEmitter();
    @Output() loadMoreSessions = new EventEmitter();
    @Output() loadMoreRoles = new EventEmitter();

    public constructor(
        private sessionConfig: IqsSessionConfigService,
        private translate: TranslateService
    ) {
        this.translate.setTranslation('en', UserDetailsTranslations.en, true);
        this.translate.setTranslation('ru', UserDetailsTranslations.ru, true);
        this.blobsUrl = this.sessionConfig.serverUrl + '/api/v1/blobs/';
    }

    public onTabChange(index: number) {
        this._currTabIndex = index;
    }

    public ngOnChanges(change: SimpleChanges) {
        if (this.loading) { return; }

    }

    public ngOnInit() { }

    public deleteSubmit(): void {
        // this.delete.emit(this.updateItem.id);
    }

    public onEditEmailSettings(): void {
        this.editEmailSettings.emit();
    }

    public onEditSmsSettings(): void {
        this.editSmsSettings.emit();
    }

    public onAccountLock(): void {
        this.lockToogle.emit();
    }

    public onChangePassword(): void {
        this.changePassword.emit();
    }

    public onGrantRole(): void {
        this.grantRole.emit();
    }

    public onRevokeRole(role: string): void {
        this.revokeRole.emit(role);
    }

    public loadMore() {
        switch (this._currTabIndex) {
            case 3:
                // roles
                this.loadMoreRoles.emit();
                break;
            case 4:
                // activities
                this.loadMoreActivities.emit();
                break;
            case 5:
                // sessions
                this.loadMoreSessions.emit();
                break;
            default: break;
        }
    }

    public getErrorMessage(error: any): string {
        return typeof error !== 'object' ? error : error.code ? this.translate.instant(error.code) : error.message;
    }
}
