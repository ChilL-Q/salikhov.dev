import { LanguageProvider } from './context/LanguageContext';
import { MainLayout } from './landing/MainLayout';

function App() {
    return (
        <LanguageProvider>
            <MainLayout />
        </LanguageProvider>
    );
}

export default App;