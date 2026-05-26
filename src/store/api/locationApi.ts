import {baseApi} from "./baseApi.ts";
import type {
    CreateLocationDto,
    LocationResponseDto,
    PaginatedLocationResponseDto,
    UpdateLocationDto
} from "../../types/api";

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
            providesTags: (result) => result
                ? [
                    ...result.data.map(({id}) => ({type: 'Locations' as const, id})),
                    {type: 'Locations' as const, id: 'LIST'}
                ]
                : [{type: 'Locations' as const, id: 'LIST'}],
        }),
        getLocation: builder.query<LocationResponseDto, string>({
            query: (id) => ({
                url: `/location/${id}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{type: 'Locations', id}],
        }),
        getMyPersonalBest: builder.query<PaginatedLocationResponseDto, { page?: number; limit?: number }>({
            query: (params) => ({
                url: '/location/guessed',
                method: 'GET',
                params: {
                    page: params.page ?? 1,
                    limit: params.limit ?? 3,
                },
            }), providesTags: (result) => result
                ? [
                    ...result.data.map(({id}) => ({type: 'Locations' as const, id})),
                    {type: 'Locations' as const, id: 'LIST'}
                ]
                : [{type: 'Locations' as const, id: 'LIST'}],
        }),
        getMyLocations: builder.query<PaginatedLocationResponseDto, { page?: number; limit?: number }>({
            query: (params) => ({
                url: '/location/me',
                method: 'GET',
                params: {
                    page: params.page ?? 1,
                    limit: params.limit ?? 3,
                },
            }),
            providesTags: (result) => result
                ? [
                    ...result.data.map(({id}) => ({type: 'Locations' as const, id})),
                    {type: 'Locations' as const, id: 'LIST'}
                ]
                : [{type: 'Locations' as const, id: 'LIST'}],
        }),
        createLocation: builder.mutation<LocationResponseDto, CreateLocationDto>({
            query: (body) => ({
                url: '/location',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Locations', id: 'LIST'}, 'User'],
        }),
        updateLocation: builder.mutation<LocationResponseDto, { id: string; dto: UpdateLocationDto }>({
            query: ({id, dto}) => ({
                url: `/location/${id}`,
                method: 'PATCH',
                body: dto,
            }),
            invalidatesTags: (_result, _error, arg) => [
                {type: 'Locations', id: arg.id},
                {type: 'Locations', id: 'LIST'}
            ],
        }),
        deleteLocation: builder.mutation<void, string>({
            query: (id) => ({
                url: `/location/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [
                {type: 'Locations', id: 'LIST'},
                {type: 'Locations', id}
            ],
        })
    })
});

export const {
    useGetLocationsQuery,
    useGetLocationQuery,
    useGetMyPersonalBestQuery,
    useGetMyLocationsQuery,
    useCreateLocationMutation,
    useUpdateLocationMutation,
    useDeleteLocationMutation
} = locationApi;