import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {openErrorModal} from '../slices/uiSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result.error) {
            const url = typeof args === 'string' ? args : args.url;
            const method = typeof args === 'string' ? 'GET' : args.method;

            if (url === '/tracker' && method === 'POST') {
                return result;
            }

            const status = result.error.status;
            const data = result.error.data as { message: string } | undefined;
            const message = data?.message || 'An unexpected error occurred';

            if (status !== 401) {
                api.dispatch(openErrorModal({
                    title: status === 'FETCH_ERROR' ? 'Connection Failed' : 'Request Error',
                    message: message,
                    statusCode: typeof status === 'number' ? status : undefined
                }));
            }
        }

        return result;
    },
    tagTypes: ['AdminLogs', 'User', 'Locations'],
    endpoints: () => ({}),
});