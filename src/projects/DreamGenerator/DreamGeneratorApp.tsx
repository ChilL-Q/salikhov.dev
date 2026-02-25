import { Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';

function DreamGeneratorApp() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
        </Routes>
    );
}

export default DreamGeneratorApp;
