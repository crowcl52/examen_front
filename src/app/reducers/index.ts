import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';

// reducers
import * as fromUI from '../redux/ui.reducers';
import * as fromUser from '../redux/user.reducers';

export interface AppState {
  ui: fromUI.State
  user: fromUser.USerState
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  user: fromUser.userReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
