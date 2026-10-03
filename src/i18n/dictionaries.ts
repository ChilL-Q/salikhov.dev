export type LanguageCode = 'en' | 'ru' | 'kz';

export const translations = {
    en: {
        nav: {
            about: 'About Me',
            projects: 'Projects',
            contact: 'Contact',
        },
        hero: {
            greeting: 'If you can imagine it, I can code it.',
            name: 'Chingiz Salikhov',
            scroll: 'Scroll',
        },
        about: {
            title: 'About Me',
            heading: 'Turning ideas into products',
            role: 'Full Stack Developer & AI Enthusiast',
            location: 'Astana, Kazakhstan',
            bio: 'My focus lies at the intersection of cutting-edge AI and robust full-stack development. I build clean, scalable, and intuitive ecosystems using the latest industry tools, constantly evolving my stack to ensure every project is future-proof.',
            bioTitle: 'Bio',
            techStackTitle: 'Tech Stack',
            statYears: 'Years of experience',
            statProjects: 'Projects delivered',
            statCoffee: 'Cups of coffee',
            remote: 'Open to remote work',
            focusLabel: 'Focus',
            focusDesc: 'Building the future of the web',
            ioaiLabel: 'Organizer',
            ioaiDesc: 'International Olympiad in Artificial Intelligence — member of the organizing team.',
        },
        projects: {
            title: 'Projects',
            subtitle: 'Experience',
            items: {
                qarau: { title: 'Qarau AI', desc: 'AI analytics for cafés on iiko: checks every receipt and reports to the owner in Telegram.' },
                kassimova: { title: 'Kassimova Design', desc: 'Architecture and interior design portfolio.' },
                abai: { title: 'AB AI', desc: 'AI-powered client retention for auto services via WhatsApp.' },
                azhar: { title: 'Azhar Trading', desc: 'Halal investment education and stock market training.' },
                thirdtime: { title: '3rd Time', desc: 'QR menu for a sports bar with an admin panel and stop-list.' },
                breakfast: { title: 'The Breakfast', desc: 'Digital menu for a café & kitchen in Astana.' }
            },
        },
        contact: {
            getInTouch: 'Get in Touch',
            description: "Have a project in mind or just want to say hi? I'd love to hear from you.",
        },
        footer: {
            copyright: 'Designed & Developed by Chingiz Salikhov © 2026',
        },
        a11y: {
            skip: 'Skip to content',
            menu: 'Menu',
            language: 'Language',
            prev: 'Previous project',
            next: 'Next project',
        },
    },
    ru: {
        nav: {
            about: 'Обо мне',
            projects: 'Проекты',
            contact: 'Контакты',
        },
        hero: {
            greeting: 'Если вы можете это представить, я могу это закодить.',
            name: 'Чингиз Салихов',
            scroll: 'Листайте',
        },
        about: {
            title: 'Обо мне',
            heading: 'Превращаю идеи в продукты',
            role: 'Full Stack Разработчик & AI Энтузиаст',
            location: 'Астана, Казахстан',
            bio: 'Моя работа — это синтез передового ИИ и надежной Full Stack архитектуры. Я создаю чистые, эффективные и интуитивно понятные веб-системы, используя только актуальные инструменты. Постоянно расширяю свой стек, чтобы каждое решение было современным и готовым к вызовам будущего.',
            bioTitle: 'Био',
            techStackTitle: 'Стек Технологий',
            statYears: 'Лет опыта',
            statProjects: 'Проектов сдано',
            statCoffee: 'Чашек кофе',
            remote: 'Открыт к удалённой работе',
            focusLabel: 'Фокус',
            focusDesc: 'Создаю будущее веба',
            ioaiLabel: 'Организатор',
            ioaiDesc: 'Международная олимпиада по искусственному интеллекту — был в команде организаторов.',
        },
        projects: {
            title: 'Проекты',
            subtitle: 'Опыт',
            items: {
                qarau: { title: 'Qarau AI', desc: 'ИИ-аналитика для кафе на iiko: проверяет каждый чек и пишет владельцу в Telegram.' },
                kassimova: { title: 'Kassimova Design', desc: 'Портфолио архитектуры и дизайна интерьеров.' },
                abai: { title: 'AB AI', desc: 'ИИ-агент возврата клиентов автосервиса через WhatsApp.' },
                azhar: { title: 'Azhar Trading', desc: 'Обучение халяль-инвестициям и работе на фондовой бирже.' },
                thirdtime: { title: '3й Тайм', desc: 'QR-меню спорт-бара с админ-панелью и стоп-листом.' },
                breakfast: { title: 'The Breakfast', desc: 'Электронное меню кафе в Астане.' }
            },
        },
        contact: {
            getInTouch: 'Связаться со мной',
            description: "Есть идея для проекта или просто хотите поздороваться? Буду рад пообщаться!",
        },
        footer: {
            copyright: 'Дизайн и разработка — Чингиз Салихов © 2026',
        },
        a11y: {
            skip: 'Перейти к содержимому',
            menu: 'Меню',
            language: 'Язык',
            prev: 'Предыдущий проект',
            next: 'Следующий проект',
        },
    },
    kz: {
        nav: {
            about: 'Мен туралы',
            projects: 'Жобалар',
            contact: 'Байланыс',
        },
        hero: {
            greeting: 'Егер сіз оны елестете алсаңыз, мен оны жүзеге асыра аламын.',
            name: 'Чингиз Салихов',
            scroll: 'Төмен',
        },
        about: {
            title: 'Мен туралы',
            heading: 'Идеяларды өнімге айналдырамын',
            role: 'Full Stack Әзірлеуші & ИИ Әуесқойы',
            location: 'Астана, Қазақстан',
            bio: 'Менің жұмысым — озық ИИ мен сенімді Full Stack архитектурасының синтезі. Мен тек өзекті құралдарды пайдалана отырып, таза, тиімді және интуитивті түсінікті веб-жүйелерді жасаймын. Әрбір шешім заманауи және болашаққа дайын болуы үшін өз стегімді үнемі кеңейтіп отырамын.',
            bioTitle: 'Био',
            techStackTitle: 'Технологиялық Стек',
            statYears: 'Жыл тәжірибе',
            statProjects: 'Аяқталған жоба',
            statCoffee: 'Кесе кофе',
            remote: 'Қашықтан жұмысқа ашықпын',
            focusLabel: 'Фокус',
            focusDesc: 'Вебтің болашағын құрамын',
            ioaiLabel: 'Ұйымдастырушы',
            ioaiDesc: 'Жасанды интеллект бойынша халықаралық олимпиада — ұйымдастыру тобында болдым.',
        },
        projects: {
            title: 'Жобалар',
            subtitle: 'Тәжірибе',
            items: {
                qarau: { title: 'Qarau AI', desc: 'iiko жүйесіндегі кафелерге арналған ИИ-аналитика: әр чекті тексеріп, иесіне Telegram-ға есеп жібереді.' },
                kassimova: { title: 'Kassimova Design', desc: 'Сәулет және интерьер дизайны портфолиосы.' },
                abai: { title: 'AB AI', desc: 'Автосервис клиенттерін WhatsApp арқылы ИИ-агентпен қайтару.' },
                azhar: { title: 'Azhar Trading', desc: 'Халяль инвестиция және қор биржасында оқыту.' },
                thirdtime: { title: '3й Тайм', desc: 'Спорт-барға арналған QR-мәзір, админ-панелі мен стоп-парағы бар.' },
                breakfast: { title: 'The Breakfast', desc: 'Астанадағы кафенің электрондық мәзірі.' }
            },
        },
        contact: {
            getInTouch: 'Хат жазу',
            description: "Жобаңыз бар ма немесе жай ғана сәлемдескіңіз келе ме? Хабарласыңыз!",
        },
        footer: {
            copyright: 'Чингиз Салихов әзірлеген © 2026',
        },
        a11y: {
            skip: 'Мазмұнға өту',
            menu: 'Мәзір',
            language: 'Тіл',
            prev: 'Алдыңғы жоба',
            next: 'Келесі жоба',
        },
    },
};
