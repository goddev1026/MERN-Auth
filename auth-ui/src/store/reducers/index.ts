import { combineReducers } from "redux";
import { Action } from "@reduxjs/toolkit";

import { reducer as auth } from "./auth";

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;
