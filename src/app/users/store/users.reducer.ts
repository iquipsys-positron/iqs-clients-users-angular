import { fromJS } from 'immutable';

import { UserActionType, UserAction, UserSelectSuccessAction } from './users.action';
import { UserState } from './users.state';
import { ViewState, User } from '../models';
import * as _ from 'lodash';

export const InitialUserState: UserState = {
    users: [],
    usersTotal: 0,
    emailSettings: null,
    smsSettings: null,
    roles: [],
    activities: [],
    sessions: [],
    selectId: null,
    viewState: ViewState.Progress,
    loading: null,
    error: null,
    isSingle: false,
    urlState: {}
};


export function UsersReducer(
    state: UserState = InitialUserState,
    action: UserAction
): UserState {
    switch (action.type) {
        case UserActionType.Init:
            let map = fromJS(state);
            map = map.set('users', []);
            map = map.set('usersTotal', 0);
            map = map.set('emailSettings', null);
            map = map.set('smsSettings', null);
            map = map.set('roles', []);
            map = map.set('activities', []);
            map = map.set('sessions', []);
            map = map.set('error', null);
            map = map.set('loading', true);
            map = map.set('viewState', ViewState.Progress);

            return map.toJS();

        case UserActionType.UserAbort:
            let viewState = state.users && state.users.length > 0 ? ViewState.View : ViewState.Empty;

            return { ...state, viewState: viewState, loading: false, error: null };

        case UserActionType.InitSuccess:
            map = fromJS(state);
            // map attached user
            map = map.set('users', action.payload.data.data);
            map = map.set('usersTotal', action.payload.data.total);
            map = map.set('error', null);
            map = map.set('loading', false);

            return map.toJS();

        case UserActionType.UserData:

            return { ...state, viewState: action.payload.state };

        case UserActionType.UserEmpty:

            return { ...state, viewState: ViewState.Empty, users: [], selectId: null };


        case UserActionType.InitFailure:

            return { ...state, error: action.payload, loading: false };

        case UserActionType.UserSelect:
            let id = null;
            const oldId = state.selectId;
            const collection = state.users;

            if (collection && collection.length > 0) {
                let index = _.findIndex(collection, (item) => item.id === action.payload);
                if (index === -1) {
                    const oldIndex = _.findIndex(collection, (item) => item.id === oldId);
                    if (oldIndex === -1) {
                        index = 0;
                    } else {
                        index = oldIndex < collection.length ? oldIndex : oldIndex - 1;
                    }

                    id = collection[index] ? collection[index].id : null;
                } else {
                    id = action.payload;
                }
            }
            let changes: any = {};
            if (state.selectId !== id) {
                changes.error = null;
            }
            changes.selectId = id;
            changes.viewState = (!state.users || state.users.length === 0) ? ViewState.Empty : ViewState.View

            const urlState = state.urlState;
            if (urlState.user_id !== action.payload) {
                urlState.user_id = action.payload;
                changes.urlState = urlState;
            }

            return Object.assign({}, state, changes)

        case UserActionType.UserSelectSuccess:

            return {
                ...state,
                emailSettings: action.payload.emailSettings,
                smsSettings: action.payload.smsSettings,
                roles: action.payload.roles,
                activities: action.payload.activities,
                sessions: action.payload.sessions
            };

        case UserActionType.UserChangeState:

            return { ...state, viewState: action.payload, error: null };

        case UserActionType.UserUpdate:

            return { ...state, loading: true, error: null };

        case UserActionType.UserUpdateSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            const updateIndex = _.findIndex(state.users, { id: action.payload.id }),
                updateUsers = state.users;
            updateUsers[updateIndex] = action.payload;

            map = map.set('users', updateUsers);

            return map.toJS();

        case UserActionType.UserUpdateFailure:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserRevokeRole:

            return { ...state, loading: true, error: null };

        case UserActionType.UserRevokeRoleSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            map = map.set('roles', action.payload);

            return map.toJS();

        case UserActionType.UserRevokeRoleFailure:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserGrantRole:

            return { ...state, loading: true, error: null };

        case UserActionType.UserGrantRoleSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            map = map.set('roles', action.payload);

            return map.toJS();

        case UserActionType.UserGrantRoleFailure:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserEditEmailSettings:

            return { ...state, loading: true, error: null };

        case UserActionType.UserEditEmailSuccessSettings:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            map = map.set('emailSettings', action.payload);

            return map.toJS();

        case UserActionType.UserEditEmailFailureSettings:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserEditSmsSettings:

            return { ...state, loading: true, error: null };

        case UserActionType.UserEditSmsSuccessSettings:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            map = map.set('smsSettings', action.payload);

            return map.toJS();

        case UserActionType.UserEditSmsFailureSettings:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserLoadMoreActivities:

            return { ...state, loading: true, error: null };

        case UserActionType.UserLoadMoreActivitiesSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);

            let activities = state.activities;
            action.payload.forEach(activity => {
                activities.push(activity)
            });

            map = map.set('activities', activities);

            return map.toJS();

        case UserActionType.UserLoadMoreActivitiesFailure:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserLoadMoreSessions:

            return { ...state, loading: true, error: null };

        case UserActionType.UserLoadMoreSessionsSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);

            let sessions = state.sessions;
            action.payload.forEach(session => {
                sessions.push(session)
            });

            map = map.set('sessions', sessions);

            return map.toJS();

        case UserActionType.UserLoadMoreSessionsFailure:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserLoadMoreRoles:

            return { ...state, loading: true, error: null };

        case UserActionType.UserLoadMoreRolesSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);

            let roles = state.roles;
            action.payload.forEach(role => {
                roles.push(role)
            });

            map = map.set('roles', roles);

            return map.toJS();

        case UserActionType.UserLoadMoreRolesFailure:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserLoadMoreUsers:

            return { ...state, loading: true, error: null };

        case UserActionType.UserLoadMoreUsersSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);

            map = map.set('users', [...state.users, ...action.payload.data.data]);
            map = map.set('usersTotal', action.payload.data.total);

            return map.toJS();

        case UserActionType.UserLoadMoreUsersFailure:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserFilterUsers:

            return { ...state, loading: true, error: null };

        case UserActionType.UserFilterUsersSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);

            map = map.set('users', action.payload.data.data);
            map = map.set('usersTotal', action.payload.data.total);

            return map.toJS();

        case UserActionType.UserFilterUsersFailure:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserChangeCancel:
            const stateAfterCancel = state.users && state.users.length > 0 ? ViewState.View : ViewState.Empty;
            return {
                ...state,
                viewState: stateAfterCancel,
                error: null,
                loading: false
            };

        case UserActionType.UserCreate:

            return { ...state, loading: true, error: null };

        case UserActionType.UserCreateSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            const createUsers = state.users;
            createUsers.push(action.payload);
            map = map.set('users', createUsers);

            return map.toJS();

        case UserActionType.UserCreateFailure:

            return { ...state, loading: false, error: action.payload };

        case UserActionType.UserDelete:

            return { ...state, loading: true, error: null };

        case UserActionType.UserDeleteSuccess:
            map = fromJS(state);
            map = map.set('error', null);
            map = map.set('loading', false);
            const users = _.filter(_.cloneDeep(state.users), element => element.id !== action.payload);
            map = map.set('users', users);
            map = map.set('viewState', users && users.length > 0 ? ViewState.View : ViewState.Empty);

            return map.toJS();

        case UserActionType.UserDeleteFailure:

            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}
