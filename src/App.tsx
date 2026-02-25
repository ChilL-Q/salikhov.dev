import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useIsMobile } from './hooks/useIsMobile';
import { lazy, Suspense } from 'react';

const Desktop = lazy(() => import('./portfolio/pages/Desktop').then(m => ({ default: m.Desktop })));
const MobileHome = lazy(() => import('./portfolio/pages/MobileHome').then(m => ({ default: m.MobileHome })));

function App() {
    const isMobile = useIsMobile();

    return (
        <Router>
            <Suspense fallback={<div style={{ background: 'black', width: '100vw', height: '100vh' }} />}>
                <Routes>
                    <Route path="/" element={isMobile ? <MobileHome /> : <Desktop />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
