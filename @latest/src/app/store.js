import { configureStore } from "@reduxjs/toolkit";
import { api } from "../app/api";
import registerReducer from "../components/registerSlice";
import loginReducer from "../components/loginSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    register: registerReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
