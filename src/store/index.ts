import {configureStore} from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import {baseApi} from './api/baseApi';
import authSlice from "./slices/authSlice.ts";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['ui/openFeedbackModal'],
                ignoredPaths: ['ui.errorModal.onConfirm'],
            }
        }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;