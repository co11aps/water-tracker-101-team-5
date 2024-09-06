import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/slice";
import { waterReducer } from "./water/slice";

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
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Persisting token field from auth slice to localstorage
const authPersistConfig = {
  key: "auth", // Ключ кореневого об'єкта, в якому будуть зберігатися дані
  storage: storage,
  whitelist: ["accessToken", "isLoggedIn", "user"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    water: waterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
