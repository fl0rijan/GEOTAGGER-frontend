import {useAppDispatch} from '../store/hooks';
import {openErrorModal} from '../store/slices/uiSlice';

export const useError = () => {
    const dispatch = useAppDispatch();

    const triggerError = (message: string, title?: string) => {
        dispatch(openErrorModal({message, title}));
    };

    return {triggerError};
};