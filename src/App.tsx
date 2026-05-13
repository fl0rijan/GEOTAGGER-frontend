import './App.css'
import {ErrorModal} from "./components/ui/ErrorModal.tsx";
import {BrowserRouter} from 'react-router-dom';

function App() {
    /*TODO useTracker();*/

    return (
        <BrowserRouter>
            <ErrorModal/>

            {/* TODO <AppRoutes /> */}
        </BrowserRouter>
    )
}

export default App
