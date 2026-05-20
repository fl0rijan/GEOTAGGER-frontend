import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface UIState {
    errorModal: {
        isOpen: boolean;
        title?: string;
        message: string;
        statusCode?: number;
        variant?: 'error' | 'success' | 'confirm' | 'quote';
        onConfirm?: () => void;
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
        openFeedbackModal: (state, action: PayloadAction<{
            title?: string;
            message: string;
            statusCode?: number;
            variant: 'error' | 'success' | 'confirm' | 'quote';
            onConfirm?: () => void;
        }>) => {
            state.errorModal.isOpen = true;
            state.errorModal.title = action.payload.title || (action.payload.variant === 'success' ? 'Success' : 'Error');
            state.errorModal.message = action.payload.message;
            state.errorModal.statusCode = action.payload.statusCode;
            state.errorModal.variant = action.payload.variant || 'error';
            state.errorModal.onConfirm = action.payload.onConfirm;
        },
        closeFeedbackModal: (state) => {
            state.errorModal.isOpen = false;
        },
    },
});

export const {openFeedbackModal, closeFeedbackModal} = uiSlice.actions;
export default uiSlice.reducer;