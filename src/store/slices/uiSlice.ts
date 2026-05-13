import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    errorModal: {
        isOpen: boolean;
        title: string;
        message: string;
        statusCode?: number;
    };
}

const initialState: UIState = {
    errorModal: {
        isOpen: false,
        title: '',
        message: '',
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openErrorModal: (state, action: PayloadAction<{ title?: string; message: string; statusCode?: number }>) => {
            state.errorModal.isOpen = true;
            state.errorModal.title = action.payload.title || 'System Error';
            state.errorModal.message = action.payload.message;
            state.errorModal.statusCode = action.payload.statusCode;
        },
        closeErrorModal: (state) => {
            state.errorModal.isOpen = false;
        },
    },
});

export const { openErrorModal, closeErrorModal } = uiSlice.actions;
export default uiSlice.reducer;