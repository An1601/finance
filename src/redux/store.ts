import reducer from "./reducer";
import userReducer from "./userReducers";
import createLoanReducer from "./createLoanReducer";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistedUserReducer = persistReducer(
  {
    key: "User",
    storage: storage,
  },
  userReducer,
);

const rootReducer = combineReducers({
  reducer: reducer,
  userReducer: persistedUserReducer,
  createLoanReducer: createLoanReducer,
});

export const store = configureStore({
  reducer: { rootReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
