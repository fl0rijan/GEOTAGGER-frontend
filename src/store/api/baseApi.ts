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
            const status = result.error.status;
            const data = result.error.data as any;
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
    endpoints: () => ({}),
});