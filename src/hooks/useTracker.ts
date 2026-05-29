import {useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {useLogActionMutation} from '../store/api/trackerApi';
import {CreateActionLogDtoActionEnum} from "../types/api";

export const useTracker = () => {
    const location = useLocation();
    const [logAction] = useLogActionMutation();
    const lastScrollTime = useRef<number>(0);
    const lastClickTime = useRef<number>(0);

    const adminLogsPaths = ["/admin/logs"];
    const isAdminLogsPage = adminLogsPaths.includes(location.pathname);

    useEffect(() => {
        if (isAdminLogsPage) return;

        const handleGlobalClick = (e: MouseEvent) => {
            const now = Date.now();

            const target = e.target as HTMLElement;

            if (now - lastClickTime.current > 500) {
                logAction({
                    action: CreateActionLogDtoActionEnum.CLICK,
                    componentType: target.tagName.toLowerCase(),
                    url: window.location.href,
                    newValue: target.innerText?.substring(0, 50) || undefined,
                });

                lastClickTime.current = now;
            }
        };

        const handleGlobalScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime.current > 3000) {
                logAction({
                    action: CreateActionLogDtoActionEnum.SCROLL,
                    componentType: null,
                    url: window.location.href,
                    newValue: `Position: ${window.scrollY}px`,
                });
                lastScrollTime.current = now;
            }
        };

        const handleGlobalChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const isPassword = target.type === 'password';

            logAction({
                action: CreateActionLogDtoActionEnum.CHANGED_VALUE,
                componentType: target.type || target.tagName.toLowerCase(),
                url: window.location.href,
                newValue: isPassword ? '********' : String(target.value),
            });
        };

        window.addEventListener('click', handleGlobalClick);
        window.addEventListener('scroll', handleGlobalScroll);
        window.addEventListener('change', handleGlobalChange);

        return () => {
            window.removeEventListener('click', handleGlobalClick);
            window.removeEventListener('scroll', handleGlobalScroll);
            window.removeEventListener('change', handleGlobalChange);
        };
    }, [logAction, location.pathname, isAdminLogsPage]);
};