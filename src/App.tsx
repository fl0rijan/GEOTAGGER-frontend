import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from './store';
import {AppRoutes} from "./AppRoutes.tsx";
import {FeedbackModal} from "./components/ui/FeedbackModal.tsx";
import {useTracker} from "./hooks/useTracker.ts";


const AppContent = () => {
    useTracker();


    return (
        <>
            <AppRoutes/>
            <FeedbackModal/>
        </>
    );
};

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppContent/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;