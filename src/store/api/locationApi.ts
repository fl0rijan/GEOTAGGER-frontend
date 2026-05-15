import {baseApi} from "./baseApi.ts";
import type {PaginatedLocationResponseDto} from "../../types/api";

export const locationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLocations: builder.query<PaginatedLocationResponseDto, { page?: number; limit?: number }>({
            query: (params) => ({
                url: '/location',
                method: 'GET',
                params: {
                    page: params.page ?? 1,
                    limit: params.limit ?? 10,
                },
            }),
            providesTags: ['Locations'],
        }),
    })
});

export const {useGetLocationsQuery} = locationApi;