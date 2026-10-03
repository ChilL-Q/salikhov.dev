import { Navbar } from '../landing/Navbar';
import { HeroSection } from '../landing/HeroSection';
import { BentoSection } from '../landing/BentoSection';
import { WorkSection } from '../landing/WorkSection';
import { ServicesSection } from '../landing/ServicesSection';
import { ProcessSection } from '../landing/ProcessSection';
import { StackSection } from '../landing/StackSection';
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
                <BentoSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
