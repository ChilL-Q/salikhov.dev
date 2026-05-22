import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { BentoSection } from './BentoSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

export const MainLayout = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <main style={{ position: 'relative', zIndex: 1 }}>
                <BentoSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
};