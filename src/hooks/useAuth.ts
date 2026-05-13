import {useAppSelector} from '../store/hooks';

export const useAuth = () => {
    const auth = useAppSelector((state) => state.auth);

    return {
        user: auth.user,
        token: auth.token,
        isAuthenticated: auth.isAuthenticated,
        isInitialLoading: auth.isInitialLoading,
        isAdmin: auth.user?.isAdmin || false,
    };
};