import { Injectable } from '@angular/core';
import { User, EmailSettings, SmsSettings, Session, Activity } from '../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, distinct, take } from 'rxjs/operators';

import { 
    InitAction,
    UserSelectAction,
    UserChangeStateAction,
    UserCreateAction,
    UserChangeCancelAction,
    UserUpdateAction,
    UserRevokeRoleAction,
    UserGrantRoleAction,
    UserEditEmailSettingsAction,
    UserEditSmsSettingsAction,
    UserLoadMoreUsersAction,
    UserLoadMoreActivitiesAction,
    UserLoadMoreSessionsAction,
    UserLoadMoreRolesAction,
    // UserLoadMoreAccountsAction,
    UserDeleteAction, 
    UserFilterUsersAction
} from '../store/users.action';
import {
    getUserUsers,
    getUserUsersTotal,
    getUserUsersLoaded,
    getUserEmailSettings,
    getUserSmsSettings,
    getUserRoles,
    getUserActivities,
    getUserSessions,
    getUserLoading,
    getUserViewState,
    getUserError,
    getUserSelectedId
} from '../store/users.state'

import * as _ from 'lodash';

@Injectable()
export class UsersService {
    constructor(
        private store: Store<any>
    ) { }

    public init(): void {
        this.store.dispatch(new InitAction());
    }

    public get users$(): Observable<User[]> {
        return this.store.select(getUserUsers).pipe(
            // rxjs can't compare deep, so this is some kind of verification our object is changed
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
        );
    }

    public get usersTotal$(): Observable<number> {
        return this.store.select(getUserUsersTotal).pipe(
            // rxjs can't compare deep, so this is some kind of verification our object is changed
            distinct()
        );
    }

    public get usersLoaded$(): Observable<boolean> {
        return this.store.select(getUserUsersLoaded).pipe(
            // rxjs can't compare deep, so this is some kind of verification our object is changed
            distinct()
        );
    }

    public get usersLoaded(): boolean {
        let res;
        this.usersLoaded$.pipe(take(1)).subscribe(r => res = r);
        return res;
    }
 
    public get error$(): Observable<string> {
        return this.store.select<any>(getUserError);
    }
 
    public get loading$(): Observable<boolean> {
        return this.store.select<any>(getUserLoading);
    }

    public get emailSettings$(): Observable<EmailSettings> {
        return this.store.select<any>(getUserEmailSettings);
    }

    public get smsSettings$(): Observable<SmsSettings> {
        return this.store.select<any>(getUserSmsSettings);
    }

    public get roles$(): Observable<string[]> {
        return this.store.select<any>(getUserRoles);
    }

    public get activities$(): Observable<Activity[]> {
        return this.store.select<any>(getUserActivities);
    }

    public get sessions$(): Observable<Session[]> {
        return this.store.select<any>(getUserSessions);
    }

    public get viewState$(): Observable<string> {
        return this.store.select<any>(getUserViewState);
    }

    public get selectId$(): Observable<string> {
        return this.store.select<any>(getUserSelectedId);
    }

    public get selectUser$() {
        return this.store.select<any>((state) => {
            const id: string = state.users.selectId;
            const users = state.users.users;
            if (users && id) {
                for (const user of users) {
                    if (user.id === id) {
                        return user;
                    }
                }
            }
            return null;
        });
    }
 
    public userSelect(id: string): void {
        this.store.dispatch(new UserSelectAction(id));
    }

    public userChangeState(state: string): void {
        this.store.dispatch(new UserChangeStateAction(state));
    }

    public userCreate(user: User) {
        this.store.dispatch(new UserCreateAction(user));
    }

    public userUpdate(user: User) {
        this.store.dispatch(new UserUpdateAction(user));
    }

    public revokeRole(userId: string, role: string) {
        this.store.dispatch(new UserRevokeRoleAction(userId, role));
    }

    public grantRole(userId: string, role: string) {
        this.store.dispatch(new UserGrantRoleAction(userId, role));
    }

    public editEmailSettings(emailSettings: EmailSettings) {
        this.store.dispatch(new UserEditEmailSettingsAction(emailSettings));
    }

    public editSmsSettings(smsSettings: SmsSettings) {
        this.store.dispatch(new UserEditSmsSettingsAction(smsSettings));
    }

    public loadMoreUsers(skip: number, filter: string) {
        this.store.dispatch(new UserLoadMoreUsersAction(skip, filter));
    }

    public loadMoreActivities(userId: string, skip: number) {
        this.store.dispatch(new UserLoadMoreActivitiesAction(userId, skip));
    }

    public loadMoreSessions(userId: string, skip: number) {
        this.store.dispatch(new UserLoadMoreSessionsAction(userId, skip));
    }

    public loadMoreRoles(userId: string, skip: number) {
        this.store.dispatch(new UserLoadMoreRolesAction(userId, skip));
    }

    public filterUsers(filter: string): void {
        this.store.dispatch(new UserFilterUsersAction(filter));
    }

    public userDelete(id: string) {
        this.store.dispatch(new UserDeleteAction(id));
    }

    public userChangeCancel(users: User[]) {
        this.store.dispatch(new UserChangeCancelAction(users));
    }

    public getNewUser(): User {
        return new User();
    }

}
