// import {
//     ActionReducerMap,
//     ActionReducer,
//     MetaReducer,
// } from '@ngrx/store';
// import * as fromRouter from '@ngrx/router-store';
// import { RouterStateUrl } from 'iqs-libs-clientshell2-angular';
// import { storeFreeze } from 'ngrx-store-freeze';

// import { environment } from '../../../environments/environment';

// export interface State {
//     router: fromRouter.RouterReducerState<RouterStateUrl>;
// }

// export const reducers: ActionReducerMap<State> = {
//     router: fromRouter.routerReducer,
// };

// export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
//     return function (state: State, action: any): State {
//         return reducer(state, action);
//     };
// }

// export const metaReducers: MetaReducer<State>[] = !environment.production
//     ? [logger, storeFreeze]
//     : [];
