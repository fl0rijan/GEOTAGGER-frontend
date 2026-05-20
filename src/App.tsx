import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from './store';
import {AppRoutes} from "./AppRoutes.tsx";
import {FeedbackModal} from "./components/ui/FeedbackModal.tsx";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes/>
                <FeedbackModal/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;