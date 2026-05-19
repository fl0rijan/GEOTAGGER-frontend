import {baseApi} from './baseApi';
import type {LoginDto, SignUpDto, TokenResponse, UserResponseDto} from '../../types/api';
import {setCredentials, logout, setToken, updateUserData} from '../slices/authSlice';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<UserResponseDto, void>({
            query: () => '/me',
            providesTags: ['User'],
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    const actualUser = (data as UserResponseDto) || data;

                    dispatch(updateUserData(actualUser));
                } catch { /* empty */ }
            },
        }),

        login: builder.mutation<TokenResponse, LoginDto>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;

                    dispatch(setToken(data.accessToken));

                    const userProfile = await dispatch(
                        authApi.endpoints.getMe.initiate(undefined, {forceRefetch: true})
                    ).unwrap();

                    dispatch(setCredentials({
                        user: userProfile,
                        token: data.accessToken
                    }));

                } catch { /* empty */ }
            },
        }),

        register: builder.mutation<void, SignUpDto>({
            query: (user) => ({
                url: '/signup',
                method: 'POST',
                body: user,
            }),
        }),

        performLogout: builder.mutation<void, void>({
            query: () => ({url: '/logout', method: 'POST'}),
            async onQueryStarted(_args, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(logout());
            },
        }),
    }),
});

export const {useGetMeQuery, useLoginMutation, useRegisterMutation, usePerformLogoutMutation} = authApi;