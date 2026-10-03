import { LanguageProvider } from './context/LanguageContext';
import { MainLayout } from './landing/MainLayout';
import type { LanguageCode } from './i18n/dictionaries';

function App({ initialLanguage }: { initialLanguage: LanguageCode }) {
    return (
        <LanguageProvider initialLanguage={initialLanguage}>
            <MainLayout />
        </LanguageProvider>
    );
}

export default App;