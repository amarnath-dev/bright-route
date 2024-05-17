import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import applySlice from "../slices/applySlice";
import mentorApplySlice from "../slices/mentorApplySlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistAuthReducer = persistReducer(persistConfig, authSlice);
const persistApplyReducer = persistReducer(persistConfig, applySlice);
const persistMentorApplyReducer = persistReducer(
  persistConfig,
  mentorApplySlice
);

const store = configureStore({
  reducer: {
    userAuth: persistAuthReducer,
    applySlice: persistApplyReducer,
    mentorApply: persistMentorApplyReducer,
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
