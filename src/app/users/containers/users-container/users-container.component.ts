import { Component, OnInit, ViewChild, OnDestroy, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PipSidenavService, PipMediaService, MediaMainChange } from 'pip-webui2-layouts';
import { PipNavService } from 'pip-webui2-nav';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { UsersContainerTranslations } from './users-container.strings';
import { UsersService } from '../../services/users.service';
import { UsersDataService } from '../../services/users.data.service';

import { IqsAskDialogComponent } from 'iqs-libs-clientshell2-angular';

import { GrantRoleDialogComponent } from '../../components/grant-role-dialog/grant-role-dialog.component';
import { ChangePasswordDialogComponent } from '../../components/change-password-dialog/change-password-dialog.component';
import { EditEmailDialogComponent } from '../../components/edit-email-dialog/edit-email-dialog.component';
import { EditSmsDialogComponent } from '../../components/edit-sms-dialog/edit-sms-dialog.component';

import { EmailSettings } from '../../models/EmailSettings';
import { SmsSettings } from '../../models/SmsSettings';
import { User, ViewState, Activity, Session } from '../../models';

@Component({
    selector: 'iqs-users-container',
    templateUrl: './users-container.component.html',
    styleUrls: ['./users-container.component.scss']
})
export class UsersContainerComponent implements OnInit, OnDestroy {
    @ViewChild('userDetails') private userDetails: any; //UserDetailsComponent;

    private isBackIcon = false;

    public users$: Observable<User[]>;
    public loading$: Observable<boolean>;
    public error$: Observable<any>;
    public viewState$: Observable<string>;
    public updateState$: Observable<string>;
    public selectId$: Observable<string>;
    public selectUser$: Observable<User>;
    public emailSettings$: Observable<EmailSettings>;
    public smsSettings$: Observable<SmsSettings>;
    public roles$: Observable<string[]>;
    public activities$: Observable<Activity[]>;
    public sessions$: Observable<Session[]>;

    public isSingle$: BehaviorSubject<boolean>;

    public selectedIndex = 0;
    public isSingle = false;

    public _users: User[];
    public advancedUsersInfo = [];

    private afterDelete: boolean = false;
    private _selectedId: string;
    private _emailSettings: EmailSettings;
    private _smsSettings: SmsSettings;
    private _state: string;
    private _activities: Activity[];
    private _sessions: Session[];
    private _roles: string[];

    public menuBusy$ = new BehaviorSubject(false);
    public contentBusy$ = new BehaviorSubject(true);

    public language: string;

    public userEmailSettings: EmailSettings;
    public userSmsSettings: SmsSettings;
    public displayRoles = false;
    public userRoles = [];
    public displayActivities = false;
    public userActivities = [];
    public displaySessions = false;
    public userSessions = [];
    public accountLocked = false;
    public accountLockBtnEnabled = true;

    private _subscribeMedia: Subscription;

    constructor(
        public dialog: MatDialog,
        private grantRoleDialog: MatDialog,
        private navService: PipNavService,
        private changePasswordDialog: MatDialog,
        private editEmailDialog: MatDialog,
        private editSmsDialog: MatDialog,
        private translate: TranslateService,
        private sidenav: PipSidenavService,
        private usersService: UsersService,
        private pipNavService: PipNavService,
        public media: PipMediaService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        console.log('Users container loaded');
        this.media.activate();
        this.language = this.translate.currentLang;
        this.sidenav.active = true;
        this.error$ = this.usersService.error$;
        this.loading$ = this.usersService.loading$;
        this.users$ = this.usersService.users$;
        this.viewState$ = this.usersService.viewState$;
        this.selectId$ = this.usersService.selectId$;
        this.selectUser$ = this.usersService.selectUser$;
        this.emailSettings$ = this.usersService.emailSettings$;
        this.smsSettings$ = this.usersService.smsSettings$;
        this.roles$ = this.usersService.roles$;
        this.activities$ = this.usersService.activities$;
        this.sessions$ = this.usersService.sessions$;

        this.translate.setTranslation('en', UsersContainerTranslations.en, true);
        this.translate.setTranslation('ru', UsersContainerTranslations.ru, true);
        this.pipNavService.showTitle('Users');

        this.navService.showBreadcrumb({
            items: [
                { title: 'APP_BREADCRUMB_TEXT' }
            ]
        });
    }

    public ngOnInit() {
        const isMobile = this.media.isMainActive('xs') || this.media.isMainActive('sm');
        const state = this.activatedRoute.snapshot.queryParams['state'];

        this.isSingle = !isMobile ? !!this.activatedRoute.snapshot.queryParams['single'] : false;
        this.isSingle$ = new BehaviorSubject(this.isSingle);
        this.isSingle$.subscribe(single => {
            this.isSingle = single;
            this.router.navigate(['/'], { queryParams: { single: this.isSingle }, queryParamsHandling: 'merge' });
            this.changeNavWithState();
        });
        this.isSingle$.next((isMobile) && (state === ViewState.Create || state === ViewState.Edit) ? true : this.isSingle);

        this.selectId$.subscribe((id) => {
            if (this._selectedId != id && this.afterDelete) {
                if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
                    this.isSingle$.next(false);
                }
            }
            this._selectedId = id;
        });

        this.emailSettings$.subscribe((emailSettings) => {
            this._emailSettings = emailSettings;
        });

        this.smsSettings$.subscribe((smsSettings) => {
            this._smsSettings = smsSettings;
        });

        this.activities$.subscribe((activities) => {
            this._activities = activities;
        });

        this.sessions$.subscribe((sessions) => {
            this._sessions = sessions;
        });

        this.roles$.subscribe((roles) => {
            this._roles = roles;
        });

        this.users$.subscribe(users => this._users = users);

        this.viewState$.subscribe(st => {
            this._state = st;
            if (!this.isSingle && this._state === ViewState.Empty) {
                this.isSingle$.next(false);
            } else this.changeNavWithState();
        });

        this.usersService.init();
        this._subscribeMedia = this.media.asObservableMain().subscribe((change: MediaMainChange) => {
            if (!(change.aliases.includes('xs') || change.aliases.includes('sm'))) {
                this.isSingle$.next(false);
                if (this.isBackIcon) { this.restoreIcon(); }
            }

            if ((change.aliases.includes('xs') || change.aliases.includes('sm'))
                && (this._state === ViewState.Create || this._state === ViewState.Edit)) {
                this.isSingle$.next(true);
            }

            if (this._state === ViewState.Empty) {
                this.isSingle$.next(false);
            }

            this.router.navigate([], { queryParams: { single: this.isSingle }, queryParamsHandling: 'merge' });
            this.cd.detectChanges();
        });
    }

    public ngOnDestroy() {
        this._subscribeMedia.unsubscribe();
    }

    public revokeRole(role: string) {
        this.dialog.open(IqsAskDialogComponent, {
            width: '450px',
            data: {
                title: 'REVOKE_ROLE.DIALOG.TITLE',
                content: [
                    this.translate.instant('REVOKE_ROLE.DIALOG.MESSAGE')
                ],
                actions: {
                    no: {
                        text: 'REVOKE_ROLE.DIALOG.BUTTON.CANCEL',
                        returnValue: false
                    },
                    yes: {
                        text: 'REVOKE_ROLE.DIALOG.BUTTON.OK',
                        returnValue: true,
                        color: 'warn'
                    }
                },
                initFocusActionKey: 'no'
            }
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this.usersService.revokeRole(this._selectedId, role);
            }
        });
    }

    public grantRole() {
        this.grantRoleDialog.open(GrantRoleDialogComponent, {
            width: '320px'
        }).afterClosed().subscribe(res => {
            if (res) {
                const userId = this._selectedId;
                const role = res;

                this.usersService.grantRole(userId, role);
            }
        });
    }

    public editEmailSettings() {
        this.editEmailDialog.open(EditEmailDialogComponent, {
            width: '320px',
            data: {
                emailSettings: this._emailSettings,
            }
        }).afterClosed().subscribe((res: EmailSettings) => {
            if (res) {
                this.usersService.editEmailSettings(res);
            }
        });
    }

    public editSmsSettings() {
        if (!this._smsSettings) {
            // initialize sms settings if it's not setted before call dialog
            this._smsSettings = { id: this._selectedId }
        }
        this.editSmsDialog.open(EditSmsDialogComponent, {
            width: '320px',
            data: {
                smsSettings: this._smsSettings
            }
        }).afterClosed().subscribe((res: SmsSettings) => {
            if (res) {
                this.usersService.editSmsSettings(res);
            }
        });;
    }

    public lockToogle() {
        let account = this._users.find((i) => { return i.id == this._selectedId });
        account.active = !account.active;
        this.usersService.userUpdate(account);

    }

    public changePassword() {
        this.changePasswordDialog.open(ChangePasswordDialogComponent, {
            width: '320px',
            data: { userId: this._selectedId }
        });
    }

    public select(id: string): void {
        if (this._state === ViewState.Create || this._state === ViewState.Edit) {
            this.dialog.open(IqsAskDialogComponent, {
                width: '450px',
                data: {
                    title: 'APP.EDIT.CANCEL.DIALOG.TITLE',
                    content: [
                        this.translate.instant('APP.EDIT.CANCEL.DIALOG.MESSAGE')
                    ],
                    actions: {
                        no: {
                            text: 'APP.EDIT.CANCEL.DIALOG.BUTTON.CANCEL',
                            returnValue: false
                        },
                        yes: {
                            text: 'APP.EDIT.CANCEL.DIALOG.BUTTON.OK',
                            returnValue: true,
                            color: 'warn'
                        }
                    },
                    initFocusActionKey: 'no'
                }
            }).afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    // DO SOMETHING
                    this.cancel();
                    this.onSelectById(id);
                } else {
                    // DO SOMETHING ELSE
                }
            });
        } else {
            this.onSelectById(id);
        }
    }

    private onSelectById(id: string): void {
        this.usersService.userSelect(id);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(true);
            this.isBackIcon = true;
            this.navService.showNavIcon({
                icon: 'arrow_back',
                action: () => {
                    if (this._state === ViewState.Create || this._state === ViewState.Edit) {
                        this.select(null);
                    } else {
                        this.isSingle$.next(false);
                        this.restoreIcon();
                    }
                }
            });
        }
    }

    public loadMoreUsers() {
        if (!this.usersService.usersLoaded) {
            this.usersService.loadMoreUsers(this._users.length, "");
        }
    }

    public loadMoreActivities() {
        this.usersService.loadMoreActivities(this._selectedId, this._activities.length);
    }

    public loadMoreSessions() {
        this.usersService.loadMoreSessions(this._selectedId, this._sessions.length);
    }

    public loadMoreRoles() {
        // do not need load more roles, cuz it's return without paging
        // this.usersService.loadMoreRoles(this._selectedId, this._roles.length);
    }

    public filterUsers(filter: string) {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailPattern.test(String(filter).toLowerCase())) {
            //email
            this.usersService.filterUsers("login="+filter);
        } else {
            this.usersService.filterUsers("name="+filter);
        }
    }

    public cancel() {
        this.usersService.userChangeCancel(this._users);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(false);
        }
        if (this.isBackIcon) {
            this.restoreIcon();
        }
        this.userDetails.resetComponent();
    }

    private restoreIcon() {
        this.isBackIcon = false;
        this.navService.showNavIcon({
            icon: 'menu',
            action: () => {
                this.sidenav.toggleOpened();
            }
        });
    }

    public changeNavWithState() {
        const isMobile = this.media.isMainActive('xs') || this.media.isMainActive('sm');
        if (!this.isSingle && this.isBackIcon) {
            this.restoreIcon();
        }
        let title: string;
        if (!isMobile) {

            switch (this._state) {
                case ViewState.View:
                    title = 'APP_BREADCRUMB_TEXT';
                    break;
                case ViewState.Edit:
                    title = !this.isSingle ? 'APP_BREADCRUMB_TEXT' : 'DEVICE.UPDATE'
                    break;
                case ViewState.Create:
                    title = 'DEVICE.CREATE';
                    break;
                default:
                    title = 'APP_BREADCRUMB_TEXT';
            }
            this.navService.showBreadcrumb({
                items: [
                    { title: title }
                ]
            });
        } else {
            if (this.isSingle && !this.isBackIcon) {
                this.isBackIcon = true;
                this.navService.showNavIcon({
                    icon: 'arrow_back',
                    action: () => {
                        this.cancel();
                    }
                });
            }
            switch (this._state) {
                case ViewState.View:
                    title = 'APP_BREADCRUMB_TEXT';
                    break;
                case ViewState.Edit:
                    title = !this.isSingle ? 'APP_BREADCRUMB_TEXT' : 'DEVICE.UPDATE'
                    break;
                case ViewState.Create:
                    title = 'DEVICE.CREATE';
                    break;
                default:
                    title = 'APP_BREADCRUMB_TEXT';
            }
            this.navService.showBreadcrumb({
                items: [{ title: title }]
            });
        }

    }

}
