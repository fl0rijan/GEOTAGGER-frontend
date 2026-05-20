import {useAppDispatch} from '../store/hooks';
import {openFeedbackModal} from '../store/slices/uiSlice';

export const useError = () => {
    const dispatch = useAppDispatch();

    const triggerError = (message: string, title?: string) => {
        dispatch(openFeedbackModal({message, title, variant: 'error'}));
    };

    return {triggerError};
};