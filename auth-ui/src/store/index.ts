import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reduxBatch } from "@manaflair/redux-batch";
import { persistStore } from "redux-persist";

import { rootReducer } from "./reducers";

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch],
});

export type Store = typeof store;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export { useAuth } from "./reducers/auth";

export default store;
