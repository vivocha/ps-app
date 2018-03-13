import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromContext from './context.reducer';
import * as fromMessages from './messages.reducer';
import * as fromWidget from './widget.reducer';
import * as fromUi from './ui.reducer';

import {ContextState, MessagesState, WidgetState, UiState} from '../models.interface';

export interface AppState {
  context: ContextState;
  messages: MessagesState;
  widgetState: WidgetState,
  ui: UiState
}

export const reducers: ActionReducerMap<AppState> = {
  context: fromContext.reducer,
  messages: fromMessages.reducer,
  widgetState: fromWidget.reducer,
  ui: fromUi.reducer

};

export const getContextState = createFeatureSelector<ContextState>('context');
export const getMessagesState = createFeatureSelector<MessagesState>('messages');
export const getWidgetState = createFeatureSelector<WidgetState>('widgetState');
export const getUiState = createFeatureSelector<UiState>('ui');