import { Action } from '@ngrx/store';
import { User, EmailSettings, SmsSettings, Activity } from '../models';
import { Session } from 'iqs-libs-clientshell2-angular';
import { DataPage } from 'iqs-libs-clientshell2-angular';

export enum UserActionType {
    Init = '[Users] Init',
    UserAbort = '[Users] Abort',
    UserEmpty = '[Users] Empty',
    UserData = '[Users] Data',
    InitSuccess = '[Users] Success',
    InitFailure = '[Users] Failure',
    UserSelect = '[Users] Select',
    UserSelectSuccess = '[Users] Select success',
    UserChangeState = '[Users] ChangeState',
    UserCreate = '[Users] Create',
    UserCreateSuccess = '[Users] Create Success',
    UserCreateFailure = '[Users] Create Failure',
    UserChangeCancel = '[Users] ChangeCancel',
    UserUpdate = '[Users] Update',
    UserUpdateSuccess = '[Users] UpdateSuccess',
    UserUpdateFailure = '[Users] UpdateFailure',
    UserRevokeRole = '[Users] Revoke role',
    UserRevokeRoleSuccess = '[Users] Revoke role Success',
    UserRevokeRoleFailure = '[Users] Revoke role Failure',
    UserGrantRole = '[Users] Grant role',
    UserGrantRoleSuccess = '[Users] Grant role Success',
    UserGrantRoleFailure = '[Users] Grant role Failure',
    UserEditEmailSettings = '[Users] Edit email settings',
    UserEditEmailSuccessSettings = '[Users] Edit email settings Success',
    UserEditEmailFailureSettings = '[Users] Edit email settings Failure',
    UserEditSmsSettings = '[Users] Edit sms settings',
    UserEditSmsSuccessSettings = '[Users] Edit sms settings Success',
    UserEditSmsFailureSettings = '[Users] Edit sms settings Failure',
    UserLoadMoreUsers = '[Users] Load more users',
    UserLoadMoreUsersSuccess = '[Users] Load more users Success',
    UserLoadMoreUsersFailure = '[Users] Load more users Failure',
    UserLoadMoreActivities = '[Users] Load more activities',
    UserLoadMoreActivitiesSuccess = '[Users] Load more activities Success',
    UserLoadMoreActivitiesFailure = '[Users] Load more activities Failure',
    UserLoadMoreSessions = '[Users] Load more sessions',
    UserLoadMoreSessionsSuccess = '[Users] Load more sessions Success',
    UserLoadMoreSessionsFailure = '[Users] Load more sessions Failure',
    UserLoadMoreRoles = '[Users] Load more roles',
    UserLoadMoreRolesSuccess = '[Users] Load more roles Success',
    UserLoadMoreRolesFailure = '[Users] Load more roles Failure',
    UserLoadMoreAccounts = '[Users] Load more accounts',
    UserLoadMoreAccountsSuccess = '[Users] Load more accounts Success',
    UserLoadMoreAccountsFailure = '[Users] Load more accounts Failure',
    UserFilterUsers = '[Users] Filter users',
    UserFilterUsersSuccess = '[Users] Filter users Success',
    UserFilterUsersFailure = '[Users] Filter users Failure',
    UserDelete = '[Users] Delete',
    UserDeleteSuccess = '[Users] DeleteSuccess',
    UserDeleteFailure = '[Users] DeleteFailure'
}

export class InitAction implements Action {
    readonly type = UserActionType.Init;

    constructor() { }
}

export class UserAbortAction implements Action {
    readonly type = UserActionType.UserAbort;

    constructor(public payload: any) { }
}

export class UserEmptyAction implements Action {
    readonly type = UserActionType.UserEmpty;

    constructor() { }
}

export class UserDataAction implements Action {
    readonly type = UserActionType.UserData;

    constructor(public payload: any) { }
}

export class InitSuccessAction implements Action {
    readonly type = UserActionType.InitSuccess;

    constructor(public payload: {
        data: DataPage<User>
    }) { }
}

export class InitFailureAction implements Action {
    readonly type = UserActionType.InitFailure;

    constructor(public payload: string) { }
}

export class UserSelectAction implements Action {
    readonly type = UserActionType.UserSelect;

    constructor(public payload: string) { }
}

export class UserSelectSuccessAction implements Action {
    readonly type = UserActionType.UserSelectSuccess;

    constructor(public payload: {
        emailSettings: EmailSettings,
        smsSettings: SmsSettings,
        roles: string[],
        activities: Activity[],
        sessions: Session[]
    }) { }
}

export class UserChangeStateAction implements Action {
    readonly type = UserActionType.UserChangeState;

    constructor(public payload: string) { }
}

export class UserCreateAction implements Action {
    readonly type = UserActionType.UserCreate;

    constructor(public payload: User) { }
}

export class UserCreateSuccessAction implements Action {
    readonly type = UserActionType.UserCreateSuccess;

    constructor(public payload: User) { }
}

export class UserCreateFailureAction implements Action {
    readonly type = UserActionType.UserCreateFailure;

    constructor(public payload: string) { }
}

export class UserChangeCancelAction implements Action {
    readonly type = UserActionType.UserChangeCancel;

    constructor(public payload: User[]) { }
}

export class UserUpdateAction implements Action {
    readonly type = UserActionType.UserUpdate;

    constructor(public payload: User) { }
}

export class UserUpdateSuccessAction implements Action {
    readonly type = UserActionType.UserUpdateSuccess;

    constructor(public payload: User) { }
}

export class UserUpdateFailureAction implements Action {
    readonly type = UserActionType.UserUpdateFailure;

    constructor(public payload: string) { }
}

export class UserRevokeRoleAction implements Action {
    readonly type = UserActionType.UserRevokeRole

    constructor(public userId: string, public role: string) { }
}

export class UserRevokeRoleSuccessAction implements Action {
    readonly type = UserActionType.UserRevokeRoleSuccess

    constructor(public payload: any) { }
}

export class UserRevokeRoleFailureAction implements Action {
    readonly type = UserActionType.UserRevokeRoleFailure

    constructor(public payload: any) { }
}

export class UserGrantRoleAction implements Action {
    readonly type = UserActionType.UserGrantRole

    constructor(public userId: string, public role: string) { }
}

export class UserGrantRoleSuccessAction implements Action {
    readonly type = UserActionType.UserGrantRoleSuccess

    constructor(public payload: any) { }
}

export class UserGrantRoleFailureAction implements Action {
    readonly type = UserActionType.UserGrantRoleFailure

    constructor(public payload: any) { }
}

export class UserEditEmailSettingsAction implements Action {
    readonly type = UserActionType.UserEditEmailSettings

    constructor(public payload: EmailSettings) { }
}

export class UserEditEmailSettingsSuccessAction implements Action {
    readonly type = UserActionType.UserEditEmailSuccessSettings;

    constructor(public payload: EmailSettings[]) { }
}

export class UserEditEmailSettingsFailureAction implements Action {
    readonly type = UserActionType.UserEditEmailFailureSettings;

    constructor(public payload: string) { }
}

export class UserEditSmsSettingsAction implements Action {
    readonly type = UserActionType.UserEditSmsSettings

    constructor(public payload: SmsSettings) { }
}

export class UserEditSmsSettingsSuccessAction implements Action {
    readonly type = UserActionType.UserEditSmsSuccessSettings;

    constructor(public payload: SmsSettings[]) { }
}

export class UserEditSmsSettingsFailureAction implements Action {
    readonly type = UserActionType.UserEditSmsFailureSettings;

    constructor(public payload: any) { }
}

export class UserLoadMoreUsersAction implements Action {
    readonly type = UserActionType.UserLoadMoreUsers

    constructor(public skip: number, public filter: string) { }
}

export class UserLoadMoreUsersSuccessAction implements Action {
    readonly type = UserActionType.UserLoadMoreUsersSuccess;

    constructor(public payload: {
        data: DataPage<User>
    }) { }
}

export class UserLoadMoreUsersFailureAction implements Action {
    readonly type = UserActionType.UserLoadMoreUsersFailure;

    constructor(public payload: any) { }
}

export class UserLoadMoreActivitiesAction implements Action {
    readonly type = UserActionType.UserLoadMoreActivities

    constructor(public userId: string, public skip: number) { }
}

export class UserLoadMoreActivitiesSuccessAction implements Action {
    readonly type = UserActionType.UserLoadMoreActivitiesSuccess;

    constructor(public payload: Activity[]) { }
}

export class UserLoadMoreActivitiesFailureAction implements Action {
    readonly type = UserActionType.UserLoadMoreActivitiesFailure;

    constructor(public payload: any) { }
}

export class UserLoadMoreSessionsAction implements Action {
    readonly type = UserActionType.UserLoadMoreSessions

    constructor(public userId: string, public skip: number) { }
}

export class UserLoadMoreSessionsSuccessAction implements Action {
    readonly type = UserActionType.UserLoadMoreSessionsSuccess;

    constructor(public payload: Session[]) { }
}

export class UserLoadMoreSessionsFailureAction implements Action {
    readonly type = UserActionType.UserLoadMoreSessionsFailure;

    constructor(public payload: any) { }
}

export class UserLoadMoreRolesAction implements Action {
    readonly type = UserActionType.UserLoadMoreRoles

    constructor(public userId: string, public skip: number) { }
}

export class UserLoadMoreRolesSuccessAction implements Action {
    readonly type = UserActionType.UserLoadMoreRolesSuccess;

    constructor(public payload: string[]) { }
}

export class UserLoadMoreRolesFailureAction implements Action {
    readonly type = UserActionType.UserLoadMoreRolesFailure;

    constructor(public payload: any) { }
}

export class UserFilterUsersAction implements Action {
    readonly type = UserActionType.UserFilterUsers

    constructor(public filter: string) { }
}

export class UserFilterUsersSuccessAction implements Action {
    readonly type = UserActionType.UserFilterUsersSuccess;

    constructor(public payload: {
        data: DataPage<User>
    }) { }
}

export class UserFilterUsersFailureAction implements Action {
    readonly type = UserActionType.UserFilterUsersFailure;

    constructor(public payload: any) { }
}

export class UserDeleteAction implements Action {
    readonly type = UserActionType.UserDelete;

    constructor(public payload: string) { }
}

export class UserDeleteSuccessAction implements Action {
    readonly type = UserActionType.UserDeleteSuccess;

    constructor(public payload: string) { }
}

export class UserDeleteFailureAction implements Action {
    readonly type = UserActionType.UserDeleteFailure;

    constructor(public payload: string) { }
}


export type UserAction = InitAction 
    | UserAbortAction
    | UserEmptyAction
    | UserDataAction
    | InitSuccessAction
    | InitFailureAction
    | UserSelectAction
    | UserSelectSuccessAction
    | UserChangeStateAction
    | UserCreateAction
    | UserCreateSuccessAction
    | UserCreateFailureAction
    | UserChangeCancelAction
    | UserUpdateAction
    | UserUpdateSuccessAction
    | UserUpdateFailureAction
    | UserRevokeRoleAction
    | UserRevokeRoleSuccessAction
    | UserRevokeRoleFailureAction
    | UserGrantRoleAction
    | UserGrantRoleSuccessAction
    | UserGrantRoleFailureAction
    | UserEditEmailSettingsAction
    | UserEditEmailSettingsSuccessAction
    | UserEditEmailSettingsFailureAction
    | UserEditSmsSettingsAction
    | UserEditSmsSettingsSuccessAction
    | UserEditSmsSettingsFailureAction
    | UserLoadMoreUsersAction
    | UserLoadMoreUsersSuccessAction
    | UserLoadMoreUsersFailureAction
    | UserLoadMoreActivitiesAction
    | UserLoadMoreActivitiesSuccessAction
    | UserLoadMoreActivitiesFailureAction
    | UserLoadMoreSessionsAction
    | UserLoadMoreSessionsSuccessAction
    | UserLoadMoreSessionsFailureAction
    | UserLoadMoreRolesAction
    | UserLoadMoreRolesSuccessAction
    | UserLoadMoreRolesFailureAction
    // | UserLoadMoreAccountsAction
    // | UserLoadMoreAccountsSuccessAction
    // | UserLoadMoreAccountsFailureAction
    | UserFilterUsersAction
    | UserFilterUsersSuccessAction
    | UserFilterUsersFailureAction
    | UserDeleteAction
    | UserDeleteSuccessAction
    | UserDeleteFailureAction;
