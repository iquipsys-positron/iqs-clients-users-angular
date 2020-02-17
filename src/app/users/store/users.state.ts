import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User, EmailSettings, SmsSettings, Activity, Session } from '../models';
 

export interface UserState {
    users: User[];
    usersTotal: number;
    emailSettings: EmailSettings;
    smsSettings: SmsSettings;
    roles: string[];
    activities: Activity[];
    sessions: Session[];
    loading: boolean;
    viewState: string;
    error: any;
    selectId: string;
    urlState: any;
    isSingle: boolean;
}


export const getUsersStoreState = createFeatureSelector<UserState>('users');

export const getUserUsers = createSelector(getUsersStoreState, (state: UserState) => state.users);
export const getUserUsersTotal = createSelector(getUsersStoreState, (state: UserState) => state.usersTotal);
export const getUserUsersLoaded = createSelector(getUsersStoreState, (state: UserState) => state.users && state.users.length === state.usersTotal);
export const getUserEmailSettings = createSelector(getUsersStoreState, (state: UserState) => state.emailSettings);
export const getUserSmsSettings = createSelector(getUsersStoreState, (state: UserState) => state.smsSettings);
export const getUserRoles = createSelector(getUsersStoreState, (state: UserState) => state.roles);
export const getUserActivities = createSelector(getUsersStoreState, (state: UserState) => state.activities);
export const getUserSessions = createSelector(getUsersStoreState, (state: UserState) => state.sessions);
export const getUserLoading = createSelector(getUsersStoreState, (state: UserState) => state.loading);
export const getUserViewState = createSelector(getUsersStoreState, (state: UserState) => state.viewState);
export const getUserError = createSelector(getUsersStoreState, (state: UserState) => state.error);
export const getUserSelectedId = createSelector(getUsersStoreState, (state: UserState) => state.selectId);
export const getUserUrlState = createSelector(getUsersStoreState, (state: UserState) => state.urlState);
export const getUserIsSingle = createSelector(getUsersStoreState, (state: UserState) => state.isSingle);

