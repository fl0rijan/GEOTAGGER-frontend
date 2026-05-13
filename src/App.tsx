import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from './store';
import {useTracker} from './hooks/useTracker';
import {ErrorModal} from './components/ui/ErrorModal';
import {useAppDispatch} from './store/hooks';
import {openErrorModal} from './store/slices/uiSlice';
import {Button, Container} from 'react-bootstrap';
import {Input} from "./components/ui/Input.tsx";
import {useEffect} from "react";
import {AdminLogsPage} from "./pages/AdminLogsPage.tsx";
import {LoginTest} from "./components/testing/LoginTest.tsx";

const AppContent = () => {
    useTracker();

    const dispatch = useAppDispatch();

    const triggerManualError = () => {
        dispatch(openErrorModal({
            title: "Manual Test Error",
            message: "This modal was triggered manually from a button!",
            statusCode: 999
        }));
    };

    useEffect(() => {

    })

    return (
        <Container className="py-5">
            <ErrorModal/>

            <section className="mt-5">
                <h5 className="fw-bold mb-3 text-secondary">Auth Test (Login + Profile)</h5>
                <LoginTest/>
            </section>

            <div className="bg-white p-5 rounded-4xl shadow-sm border border-slate-100">
                <h1 className="fw-black text-secondary mb-4">GeoTagger testing</h1>
                <p className="text-muted mb-5">Mislim da deluje z7daj</p>

                <section className="pt-5 mt-5 border-top">
                    <p className="small text-muted">Log in as Admin to see data from the database:</p>
                    <AdminLogsPage/>
                </section>

                <div className="d-flex flex-column gap-3">
                    <Button variant="primary" id="test-btn">Click to test Tracker</Button>
                    <Button variant="danger" onClick={triggerManualError}>Test Error Modal</Button>
                    <Input label="Test Input"/>
                </div>

                <div style={{height: '150vh'}} className="mt-5 text-center text-muted border-top pt-5">
                    Scollni navzdol za test SCROLL...
                </div>
            </div>
        </Container>
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