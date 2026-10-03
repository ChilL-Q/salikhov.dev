import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { MainLayout } from './landing/MainLayout';
import type { LanguageCode } from './i18n/dictionaries';

function App({ initialLanguage }: { initialLanguage: LanguageCode }) {
    return (
        <LanguageProvider initialLanguage={initialLanguage}>
            {/* with reduced motion the entrances only fade: no sliding, scaling or bobbing */}
            <MotionConfig reducedMotion="user">
                <MainLayout />
            </MotionConfig>
        </LanguageProvider>
    );
}

export default App;