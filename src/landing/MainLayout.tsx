import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { QarauSection } from './QarauSection';
import { BentoSection } from './BentoSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { useLanguage } from '../context/LanguageContext';

export const MainLayout = () => {
    const { t } = useLanguage();

    return (
        <>
            {/* first stop for keyboard users, shown only while focused */}
            <a href="#main" className="skip-link">{t('a11y.skip')}</a>
            <Navbar />
            <main id="main" style={{ position: 'relative', zIndex: 1 }}>
                <HeroSection />
                <QarauSection />
                <BentoSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
};