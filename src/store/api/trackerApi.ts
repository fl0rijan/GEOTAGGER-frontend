import {baseApi} from './baseApi';

import type {ActionLogResponseDto, CreateActionLogDto} from "../../types/api";

export const trackerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        logAction: builder.mutation<void, CreateActionLogDto>({
            query: (createActionLogDto) => ({
                url: '/tracker',
                method: 'POST',
                body: createActionLogDto,
            }),
        }),

        getAdminLogs: builder.query<ActionLogResponseDto[], void>({
            query: () => '/tracker/admin/logs',
            providesTags: ['AdminLogs'],
        }),
    }),
});

export const {useLogActionMutation, useGetAdminLogsQuery} = trackerApi;