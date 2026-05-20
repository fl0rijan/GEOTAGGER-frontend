import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    errorModal: {
        isOpen: boolean;
        title?: string;
        message: string;
        statusCode?: number;
        variant? : 'error' | 'success';
    };
}

const initialState: UIState = {
    errorModal: {
        isOpen: false,
        title: '',
        message: '',
        variant: 'error',
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openErrorModal: (state, action: PayloadAction<{ title?: string; message: string; statusCode?: number; variant: 'error' | 'success'; }>) => {
            state.errorModal.isOpen = true;
            state.errorModal.title = action.payload.title || (action.payload.variant === 'success' ? 'Success' : 'Error');
            state.errorModal.message = action.payload.message;
            state.errorModal.statusCode = action.payload.statusCode;
            state.errorModal.variant = action.payload.variant || 'error';
        },
        closeErrorModal: (state) => {
            state.errorModal.isOpen = false;
        },
    },
});

export const { openErrorModal, closeErrorModal } = uiSlice.actions;
export default uiSlice.reducer;