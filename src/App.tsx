import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from './store';
import {AppRoutes} from "./AppRoutes.tsx";
import {ErrorModal} from "./components/ui/ErrorModal.tsx";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ErrorModal/>
                <AppRoutes/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;