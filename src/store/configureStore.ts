// example - https://github.com/theobroma/rtk-query-toptal-example/blob/41ea72e4ad62ff6ec4a1e2a8f84b17301f7577e0/src/shared/redux/store.ts
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
// eslint-disable-next-line no-restricted-imports
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';

import { emptySplitApi } from '@/shared/api/emptySplitApi';

const logger = createLogger({
  collapsed: true,
});

const reducers = {
  // Slices
  // [uiSlice.name]: uiSlice.reducer,
  // API
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // logger,
      emptySplitApi.middleware,
    ]),
  // devTools: process.env.NODE_ENV === 'development',
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
