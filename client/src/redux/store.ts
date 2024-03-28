import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import applySlice from "./applyForm/applySlice";
import socketSlice from "./socket/socketSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistAuthReducer = persistReducer(persistConfig, authSlice);
const persistApplyReducer = persistReducer(persistConfig, applySlice);
const persistSocketReducer = persistReducer(persistConfig, socketSlice);
const store = configureStore({
  reducer: {
    userAuth: persistAuthReducer,
    applySlice: persistApplyReducer,
    socketSlice: persistSocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
