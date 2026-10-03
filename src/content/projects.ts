import abaiLogo from '../assets/projects-logos/ab-ai.png';
import kassimovaLogo from '../assets/projects-logos/kassimova-design.png';
import iffaLogo from '../assets/projects-logos/iffatech.png';
import azharLogo from '../assets/projects-logos/azhar-trading.png';
import thirdTimeLogo from '../assets/projects-logos/3time.webp';
import breakfastLogo from '../assets/projects-logos/the-breakfast.svg';

export interface Project {
    /** key in the `projects.items` dictionary */
    id: 'abai' | 'kassimova' | 'iffa' | 'azhar' | 'thirdtime' | 'breakfast';
    url: string;
    logo: { src: string; width: number; height: number };
    /** brand background behind the logo */
    bg: string;
    tags: string[];
}

export const PROJECTS: Project[] = [
    { id: 'abai', url: 'https://www.ab-ai.kz', logo: { src: abaiLogo, width: 376, height: 194 }, bg: '#121e36', tags: ['AI', 'WhatsApp', 'SaaS'] },
    { id: 'kassimova', url: 'https://kassimova.design', logo: { src: kassimovaLogo, width: 1066, height: 362 }, bg: '#fafaf9', tags: ['UI/UX', 'Branding', 'Design'] },
    { id: 'iffa', url: 'https://iffatech.com', logo: { src: iffaLogo, width: 368, height: 284 }, bg: '#07080d', tags: ['TypeScript', 'Cloud', 'Node.js'] },
    { id: 'azhar', url: 'https://azhar-trading.com', logo: { src: azharLogo, width: 410, height: 240 }, bg: '#020617', tags: ['EdTech', 'FinTech', 'Web'] },
    { id: 'thirdtime', url: 'https://3time.kz', logo: { src: thirdTimeLogo, width: 400, height: 467 }, bg: '#0d2118', tags: ['QR Menu', 'React', 'Admin'] },
    { id: 'breakfast', url: 'https://thebreakfast.kz', logo: { src: breakfastLogo, width: 1000, height: 320 }, bg: '#faf5ec', tags: ['QR Menu', 'HoReCa', 'Node.js'] },
];
