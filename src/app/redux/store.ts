import { infiniteScrollQueryApi } from "@/03.views/infinite-scroll/api/inifinity-scroll.api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const combines = combineReducers({
  [infiniteScrollQueryApi.reducerPath]: infiniteScrollQueryApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    state = undefined;
  }
  return combines(state, action as never);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(infiniteScrollQueryApi.middleware),
});

setupListeners(store.dispatch);
