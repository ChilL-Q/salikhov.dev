import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useIsMobile } from './hooks/useIsMobile';
import { lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';

const Desktop = lazy(() => import('./portfolio/pages/Desktop').then(m => ({ default: m.Desktop })));
const MobileHome = lazy(() => import('./portfolio/pages/MobileHome').then(m => ({ default: m.MobileHome })));

function App() {
    const isMobile = useIsMobile();

    return (
        <LanguageProvider>
            <Router>
                <Suspense fallback={<div style={{ background: 'black', width: '100vw', height: '100vh' }} />}>
                    <Routes>
                        <Route path="/" element={isMobile ? <MobileHome /> : <Desktop />} />
                    </Routes>
                </Suspense>
            </Router>
        </LanguageProvider>
    );
}

export default App;
