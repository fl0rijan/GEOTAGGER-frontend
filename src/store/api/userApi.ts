import { baseApi } from './baseApi';
import type {UpdateUserDto, UserResponseDto} from "../../types/api";


export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation<UserResponseDto, UpdateUserDto>({
            query: (updateUserDto) => ({
                url: '/me',
                method: 'PATCH',
                body: updateUserDto,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useUpdateProfileMutation } = userApi;