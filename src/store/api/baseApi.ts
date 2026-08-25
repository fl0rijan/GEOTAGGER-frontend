import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {openFeedbackModal} from '../slices/uiSlice';
import {logout, setCredentials, setToken} from '../slices/authSlice';
import type {RootState} from "../index.ts";
import type {TokenResponse, UserResponseDto} from "../../types/api";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});


export const baseApi = createApi({
        reducerPath: 'api',
        baseQuery: async (args, api, extraOptions) => {
            const url = typeof args === 'string' ? args : args.url;
            const method = typeof args === 'string' ? 'GET' : args.method || 'GET';
            const state = api.getState() as RootState;
            const isAuthRoute = url.includes('/login') || url.includes('/refresh') || url.includes('/signup');
            const isInitialMe = url.includes('/me') && !state.auth.token;

            if (isInitialMe) {
                console.log("[Auth] Checking for active session...");
            }

            let result = await baseQuery(args, api, extraOptions);

            if (result.error && result.error.status === 401 && !isAuthRoute) {
                const url = typeof args === 'string' ? args : args.url;

                if (!url.includes('/login') && !url.includes('/refresh')) {
                    const refreshResult = await baseQuery({
                        url: '/refresh',
                        method: 'POST',
                    }, api, extraOptions);

                    if (refreshResult.data) {
                        console.log("[Auth] Session restored successfully.");
                        const {accessToken} = refreshResult.data as TokenResponse;

                        api.dispatch(setToken(accessToken));

                        const fallbackHeaders = new Headers();
                        fallbackHeaders.set('authorization', `Bearer ${accessToken}`);

                        const customOptions = {
                            ...extraOptions,
                            headers: fallbackHeaders
                        };

                        const userRes = await baseQuery({url: '/me', method: 'GET'}, api, customOptions);
                        if (userRes.data) {
                            api.dispatch(setCredentials({
                                user: userRes.data as UserResponseDto,
                                token: accessToken
                            }));
                        }

                        const retryArgs = typeof args === 'string' ? {url: args} : args;
                        result = await baseQuery(retryArgs, api, customOptions);
                    } else {
                        if (isInitialMe) {
                            console.log("[Auth] No active session found. User is a Guest.");
                        } else {
                            console.warn("[Auth] Session expired. Redirecting to login.");
                        }
                        api.dispatch(logout());
                    }
                }
            }

            if (result.error) {
                const status = result.error.status;

                const shouldIgnoreModal =
                    url.includes('/tracker') ||
                    url.includes('/refresh') ||
                    (isInitialMe && status === 401 && method === 'GET');

                if (!shouldIgnoreModal) {
                    const data = result.error.data as { message: string | string[] } | undefined;
                    const message = Array.isArray(data?.message) ? data?.message[0] : data?.message;

                    api.dispatch(openFeedbackModal({
                        title: status === 429 ? 'Too Many Requests' : 'Request Failed',
                        message: status === 429
                            ? 'You are doing that too fast. Please wait a minute.'
                            : (message || 'Something went wrong'),
                        statusCode: typeof status === 'number' ? status : undefined,
                        variant: 'error'
                    }));
                }
            }

            return result;
        }
        ,
        tagTypes:
            ['User', 'AdminLogs', 'Locations'],
        endpoints:
            () => ({}),
    })
;