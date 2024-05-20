import reducer from "./reducer";
import userReducer from "./userReducers";
import commonReducer from "./commonReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
// import thunk, { ThunkMiddleware } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { Middleware, combineReducers } from "redux"; // Import Middleware type

// const middleware: Middleware[] = [thunk as unknown as ThunkMiddleware]; // Define an array of middleware

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
  commonReducer: commonReducer,
});

export const store = configureStore({
  reducer: { rootReducer },
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
