import { Navbar } from '../landing/Navbar';
import { HeroSection } from '../landing/HeroSection';
import { BentoSection } from '../landing/BentoSection';
import { ProjectsSection } from '../landing/ProjectsSection';
import { ContactSection } from '../landing/ContactSection';
import { Footer } from '../landing/Footer';

export function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <BentoSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
