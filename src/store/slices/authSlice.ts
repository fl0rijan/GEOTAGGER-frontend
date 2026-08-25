import type {UserResponseDto} from "../../types/api";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    user: UserResponseDto | null;
    token: string | null;
    isAuthenticated: boolean;
    isInitialLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isInitialLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: UserResponseDto; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isInitialLoading = false;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isInitialLoading = false;
        },
        setInitialLoading: (state, action: PayloadAction<boolean>) => {
            state.isInitialLoading = action.payload;
        },
        updateUserData: (state, action: PayloadAction<UserResponseDto>) => {
            state.user = action.payload;
        },
    },
});

export const {
    setCredentials, logout, setToken, setInitialLoading, updateUserData
} = authSlice.actions;
export default authSlice.reducer;