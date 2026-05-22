export type LanguageCode = 'en' | 'ru' | 'kz';

export const languages = [
    { code: 'en' as const, label: 'English' },
    { code: 'ru' as const, label: 'Русский' },
    { code: 'kz' as const, label: 'Қазақша' },
];

export const isRTL = (_lang: LanguageCode) => false;

export const translations = {
    en: {
        desktop: {
            about: 'About Me',
            projects: 'Projects',
            contact: 'Contact',
            privacy: 'Privacy',
            settings: 'Language',
            settingsSubtitle: 'Select your preferred language'
        },
        topbar: {
            about: 'About',
            projects: 'Projects',
            contact: 'Contact',
            socials: 'Socials',
            resume: 'Resume',
            email: 'Email',
            phone: 'Phone',
            copied: 'Copied!'
        },
        about: {
            title: 'About Me',
            role: 'Product Designer & Frontend Developer',
            role2: 'Full Stack Developer & AI Enthusiast',
            location: 'Astana, Kazakhstan',
            bio1: 'Hi! I am Chingiz—a Full Stack Developer and AI Enthusiast dedicated to building the future of the web.',
            bio2: 'You bring the business idea—I bring the digital architecture to power it. With over 6 years of engineering experience, I specialize in transforming complex concepts into fluid, high-performance digital products that drive results.',
            bio3: 'My focus lies at the intersection of cutting-edge AI and robust full-stack development. I build clean, scalable, and intuitive ecosystems using the latest industry tools, constantly evolving my stack to ensure every project is future-proof.',
            bioTitle: 'Bio',
            skills: 'Skills & Tools',
            techStackTitle: 'Tech Stack',
            experience: 'Experience',
            contactTelegram: 'Contact Telegram',
            sendEmail: 'Send Email'
        },
        projects: {
            title: 'Projects',
            subtitle: 'Experience',
            viewProject: 'View Project',
            visitSite: 'Visit Site',
            techTools: 'Technologies & Tools',
            technologies: 'Technologies Used',
            items: {
                alanya: { title: 'Alanya Holidays', desc: 'Premium rentals platform for vacation properties.' },
                iffa: { title: 'Iffa Tech', desc: 'Enterprise technical solutions & software.' },
                kassimova: { title: 'Kassimova Design', desc: 'Architecture and interior design portfolio.' },
                abai: { title: 'AB AI', desc: 'AI-powered client retention for auto services via WhatsApp.' },
                azhar: { title: 'Azhar Trading', desc: 'Halal investment education and stock market training.' }
            }
        },
        common: {
            done: 'Done'
        },
        aboutMac: {
            title: 'Portfolio OS',
            version: 'Version 1.0 (Sonoma-inspired)',
            display: 'Display',
            displayValue: 'Liquid Retina XDR, React-Powered',
            processor: 'Processor',
            processorValue: 'Human Intelligence + AI Assist',
            memory: 'Memory',
            memoryValue: 'Full Stack Knowledge Base',
            startupDisk: 'Startup Disk',
            startupDiskValue: 'Vite + TypeScript',
            footer: 'Designed & Developed by Chingiz Salikhov © 2026'
        },
        contact: {
            title: 'Contact',
            name: 'Name',
            email: 'Email',
            message: 'Message',
            send: 'Send Message',
            sending: 'Sending...',
            success: 'Message sent successfully!',
            error: 'Failed to send message. Please try again.',
            getInTouch: 'Get in Touch',
            description: "Have a project in mind or just want to say hi? I'd love to hear from you."
        },
        privacy: {
            title: 'Privacy Policy',
            updated: 'Last updated: February 2026',
            s1Title: '1. Data Collection',
            s1Desc: 'This is a personal portfolio website. We do not use persistent tracking cookies, Google Analytics, or invasive ad trackers. The only data collected is what you voluntarily provide through the Contact form (Name, Email, Message).',
            s2Title: '2. How We Use Your Data',
            s2Desc: 'Any information submitted via the Contact form is securely transmitted and used exclusively for the purpose of communicating with you regarding your inquiry. We do not sell, rent, or share your personal information with any third parties.',
            s3Title: '3. Local Storage',
            s3Desc: 'We may use standard browser technologies like localStorage solely to remember your UI preferences (such as window positions or language settings). This data remains on your device.',
            s4Title: '4. Your Rights',
            s4Desc: 'You have the right to request the deletion of any correspondence. Please contact us directly using the provided email address.'
        },
        hero: {
            greeting: 'Anything is buildable.',
            name: 'Chingiz Salikhov',
            role: 'Product Designer',
            location: 'Based in Astana'
        },
        systemAlert: {
            settingsTitle: 'Settings',
            languageChanged: 'Language changed to English'
        }
    },
    ru: {
        desktop: {
            about: 'Обо мне',
            projects: 'Проекты',
            contact: 'Контакты',
            privacy: 'Конфиденциальность',
            settings: 'Язык',
            settingsSubtitle: 'Выберите предпочитаемый язык'
        },
        topbar: {
            about: 'Об авторе',
            projects: 'Проекты',
            contact: 'Связь',
            socials: 'Соцсети',
            resume: 'Резюме',
            email: 'Почта',
            phone: 'Телефон',
            copied: 'Скопировано!'
        },
        about: {
            title: 'Обо мне',
            role: 'Продуктовый Дизайнер & Фронтенд Разработчик',
            role2: 'Full Stack Разработчик & AI Энтузиаст',
            location: 'Астана, Казахстан',
            bio1: 'Привет! Я Чингиз — Full Stack разработчик и AI-энтузиаст, создающий современные цифровые миры.',
            bio2: 'Ваша бизнес-идея заслуживает мощного технического воплощения. С более чем 6-летним опытом в разработке, я помогаю брендам проходить путь от сырого концепта до масштабируемого, высокопроизводительного продукта.',
            bio3: 'Моя работа — это синтез передового ИИ и надежной Full Stack архитектуры. Я создаю чистые, эффективные и интуитивно понятные веб-системы, используя только актуальные инструменты. Постоянно расширяю свой стек, чтобы каждое решение было современным и готовым к вызовам будущего.',
            bioTitle: 'Био',
            skills: 'Навыки и Инструменты',
            techStackTitle: 'Стек Технологий',
            experience: 'Опыт работы',
            contactTelegram: 'Связаться в Telegram',
            sendEmail: 'Написать Email'
        },
        projects: {
            title: 'Проекты',
            subtitle: 'Опыт',
            viewProject: 'Посмотреть проект',
            visitSite: 'Посетить сайт',
            techTools: 'Технологии и инструменты',
            technologies: 'Используемые технологии',
            items: {
                alanya: { title: 'Alanya Holidays', desc: 'Платформа премиум-аренды для отпускных объектов.' },
                iffa: { title: 'Iffa Tech', desc: 'Корпоративные технические решения и ПО.' },
                kassimova: { title: 'Kassimova Design', desc: 'Портфолио архитектуры и дизайна интерьеров.' },
                abai: { title: 'AB AI', desc: 'ИИ-агент возврата клиентов автосервиса через WhatsApp.' },
                azhar: { title: 'Azhar Trading', desc: 'Обучение халяль-инвестициям и работе на фондовой бирже.' }
            }
        },
        common: {
            done: 'Готово'
        },
        aboutMac: {
            title: 'Portfolio OS',
            version: 'Версия 1.0 (Sonoma-inspired)',
            display: 'Дисплей',
            displayValue: 'Liquid Retina XDR, на базе React',
            processor: 'Процессор',
            processorValue: 'Human Intelligence + AI Assist',
            memory: 'Память',
            memoryValue: 'Full Stack Knowledge Base',
            startupDisk: 'Загрузочный диск',
            startupDiskValue: 'Vite + TypeScript',
            footer: 'Разработано Chingiz Salikhov © 2026'
        },
        contact: {
            title: 'Связь',
            name: 'Имя',
            email: 'Email',
            message: 'Сообщение',
            send: 'Отправить',
            sending: 'Отправка...',
            success: 'Сообщение успешно отправлено!',
            error: 'Ошибка отправки. Попробуйте еще раз.',
            getInTouch: 'Связаться со мной',
            description: "Есть идея для проекта или просто хотите поздороваться? Буду рад пообщаться!"
        },
        privacy: {
            title: 'Политика Конфиденциальности',
            updated: 'Последнее обновление: Февраль 2026',
            s1Title: '1. Сбор данных',
            s1Desc: 'Это сайт-портфолио. Мы не используем куки для отслеживания или Google Analytics. Единственные собираемые данные — это то, что вы сами пишите в Форму обратной связи (Имя, Email, текст).',
            s2Title: '2. Использование данных',
            s2Desc: 'Информация из контактной формы используется исключительно для ответа на ваш запрос. Мы не передаем и не продаем ваши данные третьим лицам.',
            s3Title: '3. Локальное хранилище',
            s3Desc: 'Мы можем использовать localStorage только для сохранения ваших настроек (положение окон, выбранный язык). Эти данные остаются на вашем устройстве.',
            s4Title: '4. Ваши права',
            s4Desc: 'Вы имеете право потребовать удаление любой вашей переписки. Для этого просто напишите нам на email.'
        },
        hero: {
            greeting: 'Всё можно построить.',
            name: 'Чингиз Салихов',
            role: 'Продуктовый Дизайнер',
            location: 'Астана, Казахстан'
        },
        systemAlert: {
            settingsTitle: 'Настройки',
            languageChanged: 'Язык изменен на Русский'
        }
    },
    kz: {
        desktop: {
            about: 'Мен туралы',
            projects: 'Жобалар',
            contact: 'Байланыс',
            privacy: 'Құпиялылық',
            settings: 'Тіл',
            settingsSubtitle: 'Қалаған тілді таңдаңыз'
        },
        topbar: {
            about: 'Авторы',
            projects: 'Жобалар',
            contact: 'Байланыс',
            socials: 'Желілер',
            resume: 'Түйіндеме',
            email: 'Пошта',
            phone: 'Телефон',
            copied: 'Көшірілді!'
        },
        about: {
            title: 'Мен туралы',
            role: 'Өнім Дизайнері & Фронтенд Әзірлеуші',
            role2: 'Full Stack Әзірлеуші & ИИ Әуесқойы',
            location: 'Астана, Қазақстан',
            bio1: 'Сәлем! Мен Чингиз — заманауи цифрлық әлемді құрушы Full Stack әзірлеуші және ИИ әуесқойы.',
            bio2: 'Сіздің бизнес-идеяңыз қуатты техникалық іске асыруға лайықты. Бағдарламалаудағы 6 жылдан астам тәжірибеммен мен брендтерге концепциядан бастап ауқымды, жоғары өнімді өнімге дейінгі жолдан өтуге көмектесемін.',
            bio3: 'Менің жұмысым — озық ИИ мен сенімді Full Stack архитектурасының синтезі. Мен тек өзекті құралдарды пайдалана отырып, таза, тиімді және интуитивті түсінікті веб-жүйелерді жасаймын. Әрбір шешім заманауи және болашаққа дайын болуы үшін өз стегімді үнемі кеңейтіп отырамын.',
            bioTitle: 'Био',
            skills: 'Дағдылар мен Құралдар',
            techStackTitle: 'Технологиялық Стек',
            experience: 'Жұмыс тәжірибесі',
            contactTelegram: 'Telegram-мен байланысу',
            sendEmail: 'Email жазу'
        },
        projects: {
            title: 'Жобалар',
            subtitle: 'Тәжірибе',
            viewProject: 'Жобаны көру',
            visitSite: 'Сайтқа өту',
            techTools: 'Технологиялар мен құралдар',
            technologies: 'Қолданылған технологиялар',
            items: {
                alanya: { title: 'Alanya Holidays', desc: 'Демалыс объектілері үшін премиум жалға беру платформасы.' },
                iffa: { title: 'Iffa Tech', desc: 'Корпоративтік техникалық шешімдер мен БҚ.' },
                kassimova: { title: 'Kassimova Design', desc: 'Сәулет және интерьер дизайны портфолиосы.' },
                abai: { title: 'AB AI', desc: 'Автосервис клиенттерін WhatsApp арқылы ИИ-агентпен қайтару.' },
                azhar: { title: 'Azhar Trading', desc: 'Халяль инвестиция және қор биржасында оқыту.' }
            }
        },
        common: {
            done: 'Дайын'
        },
        aboutMac: {
            title: 'Portfolio OS',
            version: 'Нұсқа 1.0 (Sonoma стилінде)',
            display: 'Дисплей',
            displayValue: 'Liquid Retina XDR, React негізінде',
            processor: 'Процессор',
            processorValue: 'Human Intelligence + AI Assist',
            memory: 'Жад',
            memoryValue: 'Full Stack Knowledge Base',
            startupDisk: 'Жүктеу дискісі',
            startupDiskValue: 'Vite + TypeScript',
            footer: 'Чингиз Салихов әзірлеген © 2026'
        },
        contact: {
            title: 'Байланыс',
            name: 'Аты',
            email: 'Пошта',
            message: 'Хабарлама',
            send: 'Жіберу',
            sending: 'Жіберілуде...',
            success: 'Хабарлама сәтті жіберілді!',
            error: 'Қате шықты. Қайта көріңіз.',
            getInTouch: 'Хат жазу',
            description: "Жобаңыз бар ма немесе жай ғана сәлемдескіңіз келе ме? Хабарласыңыз!"
        },
        privacy: {
            title: 'Құпиялық Саясаты',
            updated: 'Соңғы өңдеу: Ақпан 2026',
            s1Title: '1. Деректерді жинау',
            s1Desc: 'Бұл жеке портфолио сайты. Біз трекинг куки немесе аналитика қолданбаймыз. Тек Байланыс формасы арқылы өзіңіз жіберген деректер ғана жиналады.',
            s2Title: '2. Деректерді қолдану',
            s2Desc: 'Байланыс формасынан келген ақпарат тек сіздің сұрағыңызға жауап беру үшін ғана қолданылады. Үшінші жаққа берілмейді.',
            s3Title: '3. Жергілікті сақтау',
            s3Desc: 'Терезелердің орны мен тіл баптауларын сақтау үшін ғана localStorage қолданылуы мүмкін.',
            s4Title: '4. Құқықтарыңыз',
            s4Desc: 'Кез келген хабарламаны өшіруді талап ете аласыз. Ол үшін бізге тікелей хат жазыңыз.'
        },
        hero: {
            greeting: 'Бәрін құрастыруға болады.',
            name: 'Чингиз Салихов',
            role: 'Өнім Дизайнері',
            location: 'Астана қаласы'
        },
        systemAlert: {
            settingsTitle: 'Баптаулар',
            languageChanged: 'Тіл қазақшаға ауыстырылды'
        }
    }
};

type NestedKeyOf<ObjectType extends object> =
    { [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`
    }[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof translations.en>;
