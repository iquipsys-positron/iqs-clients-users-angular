import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { findIndex } from 'lodash';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, tap, throttleTime } from 'rxjs/operators';

import * as fromUserActions from './users.action';

import { UsersDataService } from '../services/users.data.service';
import { ViewState, EmailSettings, SmsSettings } from '../models';

import * as _ from 'lodash';

@Injectable()
export class UsersEffects {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private actions$: Actions,
        private usersDataService: UsersDataService,
    ) { }

    @Effect() init$: Observable<Action> = this.actions$.pipe(
        ofType(
            fromUserActions.UserActionType.Init,
            fromUserActions.UserActionType.UserAbort
        ),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.Init) {
                return this.usersDataService.getAccounts(0, "")
                    .pipe(
                        map(data => {
                            return new fromUserActions.InitSuccessAction({data});
                        }),
                        catchError(error => of(new fromUserActions.InitFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() initSuccess$ = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.InitSuccess),
        map((action: any) => action.payload),
        map(payload => {
            const users = payload.data.data;
            const total = payload.data.total;
            const saveState = this.activatedRoute.snapshot.queryParams['state'];

            if (users && users.length > 0) {
                // select user by id
                let index: number = findIndex(users, { id: this.activatedRoute.snapshot.queryParams['user_id'] });
                index = index > -1 ? index : 0;
                if (!saveState || saveState === ViewState.View || saveState === ViewState.Edit) {
                    return new fromUserActions.UserDataAction({ state: ViewState.View, id: users[index].id });
                }
                return new fromUserActions.UserChangeStateAction(ViewState.Create);
            }
            return new fromUserActions.UserEmptyAction();
        })
    );

    @Effect() userData$ = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserData),
        map((action: any) => action.payload),
        map(payload => {
            return new fromUserActions.UserSelectAction(payload.id);
        })
    );

    @Effect({ dispatch: false }) userChangeState$ = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserChangeState),
        tap(action => {
            const actionWithPayload = <any>action;
            this.router.navigate([], { queryParams: { state: actionWithPayload.payload }, queryParamsHandling: 'merge' });
        })
    );

    @Effect({ dispatch: false }) userChangeCancel$ = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserChangeCancel),
        map((action: any) => action.payload),
        map(payload => {
            this.router.navigate([], {
                queryParams: { state: payload && payload.length > 0 ? ViewState.View : ViewState.Empty },
                queryParamsHandling: 'merge'
            });

            return new fromUserActions.UserChangeCancelAction(payload);
        })
    );

    @Effect() userSelect$ = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserSelect),
        switchMap((action: fromUserActions.UserSelectAction) => {
            this.router.navigate([], {
                queryParams: { user_id: action.payload, state: ViewState.View },
                queryParamsHandling: 'merge'
            });
            return forkJoin(
                this.usersDataService.getEmailSettings(action.payload),
                this.usersDataService.getSmsSettings(action.payload),
                this.usersDataService.getRoles(action.payload, 0),
                this.usersDataService.getActivities(action.payload, 0),
                this.usersDataService.getSessions(action.payload, 0)
            ).pipe(
                map(([
                    emailSettings,
                    smsSettings,
                    roles,
                    activities,
                    sessions
                ]) => new fromUserActions.UserSelectSuccessAction({
                    emailSettings,
                    smsSettings,
                    roles,
                    activities,
                    sessions
                }))
            );
        })
    );

    @Effect() userUpdate$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserUpdate),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.UserUpdate) {
                const payload = (<any>action).payload;
                return this.usersDataService.updateAccount(payload)
                    .pipe(
                        map(data => {
                            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                            return new fromUserActions.UserUpdateSuccessAction(data);
                        }),
                        catchError(error => of(new fromUserActions.UserUpdateFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() revokeRole$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserRevokeRole),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.UserRevokeRole) {
                return this.usersDataService.revokeRole(action.userId, action.role)
                    .pipe(
                        map(data => {
                            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                            return new fromUserActions.UserRevokeRoleSuccessAction(data);
                        }),
                        catchError(error => of(new fromUserActions.UserRevokeRoleFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() grantRole$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserGrantRole),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.UserGrantRole) {
                return this.usersDataService.grantRole(action.userId, action.role)
                    .pipe(
                        map(data => {
                            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                            return new fromUserActions.UserGrantRoleSuccessAction(data);
                        }),
                        catchError(error => of(new fromUserActions.UserGrantRoleFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() editEmailSettings$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserEditEmailSettings),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.UserEditEmailSettings) {
                return this.usersDataService.setEmailSettings(action.payload)
                    .pipe(
                        map(data => {
                            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                            return new fromUserActions.UserEditEmailSettingsSuccessAction(data);
                        }),
                        catchError(error => of(new fromUserActions.UserEditEmailSettingsFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() editSmsSettings$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserEditSmsSettings),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.UserEditSmsSettings) {
                return this.usersDataService.setSmsSettings(action.payload)
                    .pipe(
                        map(data => {
                            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                            return new fromUserActions.UserEditSmsSettingsSuccessAction(data);
                        }),
                        catchError(error => of(new fromUserActions.UserEditSmsSettingsFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() loadMoreActivities$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserLoadMoreActivities),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.UserLoadMoreActivities) {
                return this.usersDataService.getActivities(action.userId, action.skip)
                    .pipe(
                        map(data => {
                            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                            return new fromUserActions.UserLoadMoreActivitiesSuccessAction(data);
                        }),
                        catchError(error => of(new fromUserActions.UserLoadMoreActivitiesFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() loadMoreSessions$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserLoadMoreSessions),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.UserLoadMoreSessions) {
                return this.usersDataService.getSessions(action.userId, action.skip)
                    .pipe(
                        map(data => {
                            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                            return new fromUserActions.UserLoadMoreSessionsSuccessAction(data);
                        }),
                        catchError(error => of(new fromUserActions.UserLoadMoreSessionsFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() loadMoreRoles$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserLoadMoreRoles),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.UserLoadMoreRoles) {
                return this.usersDataService.getRoles(action.userId, action.skip)
                    .pipe(
                        map(data => {
                            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                            return new fromUserActions.UserLoadMoreRolesSuccessAction(data);
                        }),
                        catchError(error => of(new fromUserActions.UserLoadMoreRolesFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() loadMoreUsers$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserLoadMoreUsers),
        throttleTime(1000),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.UserLoadMoreUsers) {
                return this.usersDataService.getAccounts(action.skip, action.filter)
                    .pipe(
                        map(data => {
                            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                            return new fromUserActions.UserLoadMoreUsersSuccessAction({data});
                        }),
                        catchError(error => of(new fromUserActions.UserLoadMoreUsersFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() filterUsers$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserFilterUsers),
        throttleTime(1000),
        switchMap((action: any) => {
            if (action.type = fromUserActions.UserActionType.UserFilterUsers) {
                return this.usersDataService.getAccounts(0, action.filter)
                    .pipe(
                        map(data => {
                            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                            return new fromUserActions.UserFilterUsersSuccessAction({data});
                        }),
                        catchError(error => of(new fromUserActions.UserFilterUsersFailureAction(error)))
                    );
            } else {
                return of();
            }
        })
    );

    @Effect() userCreate$: Observable<Action> = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserCreate),
        switchMap((action: any) => {
            return of();
            // if (action.type = fromUserActions.UserActionType.UserCreate) {
            //     const payload = (<any>action).payload;
            //     return this.usersDataService.userCreate(payload)
            //         .pipe(
            //             map(data => {
            //                 return new fromUserActions.UserCreateSuccessAction(data);
            //             }),
            //             catchError(error => of(new fromUserActions.UserCreateFailureAction(error)))
            //         );
            // } else {
            //     return of();
            // }
        })
    );

    @Effect() userCreateSuccess$ = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserCreateSuccess),
        map((action: any) => action.payload),
        map(payload => {
            const userId = payload ? payload.id : null;
            this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

            return new fromUserActions.UserSelectAction(userId);
        })
    );

    @Effect() userDelete$ = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserDelete),
        switchMap((action: any) => {
            return of();
            // if (action.type = fromUserActions.UserActionType.UserDelete) {
            //     const payload = (<any>action).payload;
            //     return this.usersDataService.userDelete(payload)
            //         .pipe(
            //             map(data => {
            //                 return new fromUserActions.UserDeleteSuccessAction(payload);
            //             }),
            //             catchError(error => of(new fromUserActions.UserDeleteFailureAction(error)))
            //         );
            // } else {
            //     return of();
            // }
        })
    );

    @Effect() userDeleteSuccess$ = this.actions$.pipe(
        ofType(fromUserActions.UserActionType.UserDeleteSuccess),
        map((action: any) => action.payload),
        map(payload => {
            return new fromUserActions.UserSelectAction(null);
        })
    );
}
