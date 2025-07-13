import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/lib/features/users/userSlice";
import feedReducer from "@/lib/features/feeds/feedSlice";
import connectionReducer from "@/lib/features/connections/connectionSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      feed: feedReducer,
      connections: connectionReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
