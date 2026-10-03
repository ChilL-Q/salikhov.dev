import { Navbar } from '../landing/Navbar';
import { HeroSection } from '../landing/HeroSection';
import { WorkSection } from '../landing/WorkSection';
import { ServicesSection } from '../landing/ServicesSection';
import { ProcessSection } from '../landing/ProcessSection';
import { StackSection } from '../landing/StackSection';
import { AboutSection } from '../landing/AboutSection';
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
                <ProcessSection />
                <StackSection />
                <AboutSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
