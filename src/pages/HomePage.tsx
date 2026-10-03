import { Navbar } from '../landing/Navbar';
import { HeroSection } from '../landing/HeroSection';
import { BentoSection } from '../landing/BentoSection';
import { WorkSection } from '../landing/WorkSection';
import { ContactSection } from '../landing/ContactSection';
import { Footer } from '../landing/Footer';

export function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <WorkSection />
                <BentoSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
