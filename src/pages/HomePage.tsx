import { Navbar } from '../landing/Navbar';
import { HeroSection } from '../landing/HeroSection';
import { BentoSection } from '../landing/BentoSection';
import { WorkSection } from '../landing/WorkSection';
import { ServicesSection } from '../landing/ServicesSection';
import { ContactSection } from '../landing/ContactSection';
import { Footer } from '../landing/Footer';

export function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <WorkSection />
                <ServicesSection />
                <BentoSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
