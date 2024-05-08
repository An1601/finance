import reducer from "./reducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { Middleware } from "redux"; // Import Middleware type

const middleware: Middleware[] = [thunk as unknown as ThunkMiddleware]; // Define an array of middleware

const root = {};

const store = configureStore({
  reducer: reducer,
  middleware: middleware, // Pass the middleware array
});

export default store;
