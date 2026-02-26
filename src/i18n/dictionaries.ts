export type LanguageCode = 'en' | 'ru' | 'kk' | 'ar' | 'tr';

export const languages = [
    { code: 'en' as const, label: 'English' },
    { code: 'ru' as const, label: 'Русский' },
    { code: 'kk' as const, label: 'Қазақша' },
    { code: 'ar' as const, label: 'العربية' },
    { code: 'tr' as const, label: 'Türkçe' },
];

export const isRTL = (lang: LanguageCode) => lang === 'ar';

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
            location: 'Istanbul, Turkey',
            bio1: 'Hello! I am Chingiz, a passionate Product Designer and Frontend Developer with a keen eye for creating beautiful, functional, and user-centric digital experiences.',
            bio2: 'Bridging the gap between design and engineering, I specialize in crafting seamless interfaces that look great and feel intuitive to use.',
            bio3: 'Crafting digital experiences that merge aesthetics with functionality. Currently focused on building next-gen AI interfaces and immersive web applications. Exploring the boundaries of what\'s possible on the web with React, Three.js, and modern AI tools.',
            bioTitle: 'Bio',
            skills: 'Skills & Tools',
            techStackTitle: 'Tech Stack',
            experience: 'Experience',
            contactTelegram: 'Contact Telegram',
            sendEmail: 'Send Email'
        },
        projects: {
            title: 'Projects',
            viewProject: 'View Project',
            visitSite: 'Visit Site',
            techTools: 'Technologies & Tools',
            technologies: 'Technologies Used',
            items: {
                alanya: { title: 'Alanya Holidays', desc: 'Premium rentals platform in Alanya, Turkey.' },
                iffa: { title: 'Iffa Tech', desc: 'Enterprise technical solutions & software.' },
                kassimova: { title: 'Kassimova Design', desc: 'Architecture and interior design portfolio.' }
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
            greeting: 'Hi, I am',
            name: 'Chingiz',
            role: 'Product Designer',
            location: 'Based in Istanbul'
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
            location: 'Стамбул, Турция',
            bio1: 'Привет! Я Чингиз, увлеченный продуктовый дизайнер и разработчик. Обожаю создавать красивые, функциональные и удобные цифровые продукты.',
            bio2: 'Объединяя дизайн и программирование, я специализируюсь на бесшовных интерфейсах, которые не только отлично выглядят, но и интуитивно понятны.',
            bio3: 'Создаю цифровой опыт, сочетающий эстетику с функциональностью. В настоящее время сосредоточен на создании ИИ-интерфейсов следующего поколения и иммерсивных веб-приложений. Изучаю возможности веба с помощью React, Three.js и современных инструментов ИИ.',
            bioTitle: 'Био',
            skills: 'Навыки и Инструменты',
            techStackTitle: 'Стек Технологий',
            experience: 'Опыт работы',
            contactTelegram: 'Связаться в Telegram',
            sendEmail: 'Написать Email'
        },
        projects: {
            title: 'Проекты',
            viewProject: 'Посмотреть проект',
            visitSite: 'Посетить сайт',
            techTools: 'Технологии и инструменты',
            technologies: 'Используемые технологии',
            items: {
                alanya: { title: 'Alanya Holidays', desc: 'Платформа премиум-аренды в Алании, Турция.' },
                iffa: { title: 'Iffa Tech', desc: 'Корпоративные технические решения и ПО.' },
                kassimova: { title: 'Kassimova Design', desc: 'Портфолио архитектуры и дизайна интерьеров.' }
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
            greeting: 'Привет, я',
            name: 'Чингиз',
            role: 'Продуктовый Дизайнер',
            location: 'Стамбул, Турция'
        },
        systemAlert: {
            settingsTitle: 'Настройки',
            languageChanged: 'Язык изменен на Русский'
        }
    },
    kk: {
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
            location: 'Ыстамбұл, Түркия',
            bio1: 'Сәлем! Мен Шыңғыспын, әдемі әрі ыңғайлы цифрлық өнімдерді жасауға құмармын.',
            bio2: 'Дизайн мен инженерияны біріктіре отырып, мен тек визуалды тартымды ғана емес, сонымен бірге қолдануға өте ыңғайлы интерфейстерді жасаймын.',
            bio3: 'Эстетика мен функционалдылықты біріктіретін цифрлық тәжірибелерді жасау. Қазіргі уақытта жаңа буынның ИИ интерфейстерін және иммерсивті веб-қосымшаларды жасауға бағытталған. React, Three.js және заманауи ИИ құралдарымен вебтің мүмкіндіктерін зерттеу.',
            bioTitle: 'Био',
            skills: 'Дағдылар мен Құралдар',
            techStackTitle: 'Технологиялық Стек',
            experience: 'Жұмыс тәжірибесі',
            contactTelegram: 'Telegram-мен байланысу',
            sendEmail: 'Email жазу'
        },
        projects: {
            title: 'Жобалар',
            viewProject: 'Жобаны көру',
            visitSite: 'Сайтқа өту',
            techTools: 'Технологиялар мен құралдар',
            technologies: 'Қолданылған технологиялар',
            items: {
                alanya: { title: 'Alanya Holidays', desc: 'Аланиядағы премиум жалға беру платформасы.' },
                iffa: { title: 'Iffa Tech', desc: 'Корпоративтік техникалық шешімдер мен БҚ.' },
                kassimova: { title: 'Kassimova Design', desc: 'Сәулет және интерьер дизайны портфолиосы.' }
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
            footer: 'Шыңғыс Салыхов әзірлеген © 2026'
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
            greeting: 'Сәлем, мен',
            name: 'Шыңғыспын',
            role: 'Өнім Дизайнері',
            location: 'Ыстамбұл қаласы'
        },
        systemAlert: {
            settingsTitle: 'Баптаулар',
            languageChanged: 'Тіл қазақшаға ауыстырылды'
        }
    },
    ar: {
        desktop: {
            about: 'نبذة عني',
            projects: 'المشاريع',
            contact: 'اتصل بي',
            privacy: 'الخصوصية',
            settings: 'اللغة',
            settingsSubtitle: 'اختر لغتك المفضلة'
        },
        topbar: {
            about: 'عني',
            projects: 'المشاريع',
            contact: 'اتصال',
            socials: 'تواصل اجتماعي',
            resume: 'سيرة ذاتية',
            email: 'بريد',
            phone: 'هاتف',
            copied: 'تم النسخ!'
        },
        about: {
            title: 'نبذة عني',
            role: 'مصمم منتجات ومطور واجهات',
            role2: 'مطور Full Stack ومتحمس للذكاء الاصطناعي',
            location: 'إسطنبول، تركيا',
            bio1: 'مرحباً! أنا جنكيز، مصمم منتجات ومطور واجهات شغوف بإنشاء تجارب رقمية جميلة وعملية وتتمحور حول المستخدم.',
            bio2: 'أقوم بسد الفجوة بين التصميم والهندسة، وأتخصص في صياغة واجهات سلسة تبدو رائعة وبديهية في الاستخدام.',
            bio3: 'صياغة تجارب رقمية تدمج الجماليات مع الوظيفة. أركز حالياً على بناء واجهات ذكاء اصطناعي من الجيل القادم وتطبيقات ويب غامرة. استكشاف حدود ما هو ممكن على الويب باستخدام React و Three.js وأدوات الذكاء الاصطناعي الحديثة.',
            bioTitle: 'السيرة',
            skills: 'المهارات والأدوات',
            techStackTitle: 'مجموعة التقنيات',
            experience: 'الخبرة',
            contactTelegram: 'اتصال عبر تلغرام',
            sendEmail: 'إرسال بريد إلكتروني'
        },
        projects: {
            title: 'المشاريع',
            viewProject: 'عرض المشروع',
            visitSite: 'زيارة الموقع',
            techTools: 'التقنيات والأدوات',
            technologies: 'التقنيات المستخدمة',
            items: {
                alanya: { title: 'Alanya Holidays', desc: 'منصة تأجير متميزة في ألانيا، تركيا.' },
                iffa: { title: 'Iffa Tech', desc: 'حلول وبرامج تقنية للشركات.' },
                kassimova: { title: 'Kassimova Design', desc: 'محفظة الهندسة المعمارية والتصميم الداخلي.' }
            }
        },
        common: {
            done: 'تم'
        },
        aboutMac: {
            title: 'Portfolio OS',
            version: 'الإصدار 1.0 (Sonoma)',
            display: 'الشاشة',
            displayValue: 'Liquid Retina XDR، مدعوم من React',
            processor: 'المعالج',
            processorValue: 'Human Intelligence + AI Assist',
            memory: 'الذاكرة',
            memoryValue: 'Full Stack Knowledge Base',
            startupDisk: 'قرص الإقلاع',
            startupDiskValue: 'Vite + TypeScript',
            footer: 'تصميم وبناء Chingiz Salikhov © 2026'
        },
        contact: {
            title: 'اتصل بي',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            message: 'الرسالة',
            send: 'إرسال',
            sending: 'جاري الإرسال...',
            success: 'تم إرسال الرسالة بنجاح!',
            error: 'فشل إرسال الرسالة. حاول مرة اخرى.',
            getInTouch: 'ابقى على تواصل',
            description: "هل لديك مشروع في الاعتبار أو تريد فقط إلقاء التحية؟ أحب أن أسمع منك."
        },
        privacy: {
            title: 'سياسة الخصوصية',
            updated: 'تاريخ التحديث: فبراير 2026',
            s1Title: '1. جمع البيانات',
            s1Desc: 'هذا موقع شخصي. نحن لا نستخدم ملفات تعريف الارتباط للتتبع. البيانات الوحيدة التي يتم جمعها هي ما تقدمه طواعية من خلال نموذج الاتصال.',
            s2Title: '2. كيف نستخدم بياناتك',
            s2Desc: 'يتم استخدام أي معلومات مقدمة عبر نموذج الاتصال حصريًا لغرض التواصل معك. نحن لا نبيع بياناتك لأطراف ثالثة.',
            s3Title: '3. التخزين المحلي',
            s3Desc: 'قد نستخدم تقنيات المتصفح القياسية فقط لتذكر تفضيلات واجهة المستخدم الخاصة بك (مثل إعدادات اللغة).',
            s4Title: '4. حقوقك',
            s4Desc: 'لديك الحق في طلب حذف أي مراسلات. يرجى الاتصال بنا مباشرة لمعالجة ذلك.'
        },
        hero: {
            greeting: 'مرحباً، أنا',
            name: 'جنكيز',
            role: 'مصمم منتجات',
            location: 'مقيم في إسطنبول'
        },
        systemAlert: {
            settingsTitle: 'إعدادات',
            languageChanged: 'تم تغيير اللغة إلى العربية'
        }
    },
    tr: {
        desktop: {
            about: 'Hakkımda',
            projects: 'Projeler',
            contact: 'İletişim',
            privacy: 'Gizlilik',
            settings: 'Dil',
            settingsSubtitle: 'Tercih ettiğiniz dili seçin'
        },
        topbar: {
            about: 'Hakkımda',
            projects: 'Projeler',
            contact: 'İletişim',
            socials: 'Sosyal Medya',
            resume: 'Özgeçmiş',
            email: 'E-posta',
            phone: 'Telefon',
            copied: 'Kopyalandı!'
        },
        about: {
            title: 'Hakkımda',
            role: 'Ürün Tasarımcısı & Arayüz Geliştiricisi',
            role2: 'Full Stack Geliştirici & Yapay Zeka Meraklısı',
            location: 'İstanbul, Türkiye',
            bio1: 'Merhaba! Ben Cengiz, güzel ve işlevsel dijital deneyimler yaratmaya hevesli bir Ürün Tasarımcısı ve Arayüz Geliştiricisiyim.',
            bio2: 'Tasarım ve mühendislik arasındaki boşluğu kapatarak, harika görünen ve kullanımı sezgisel olan kusursuz arayüzler tasarlamada uzmanım.',
            bio3: 'Estetiği işlevsellikle birleştiren dijital deneyimler hazırlamak. Şu anda yeni nesil yapay zeka arayüzleri ve sürükleyici web uygulamaları oluşturmaya odaklanmış durumda. React, Three.js ve modern yapay zeka araçlarıyla web üzerinde nelerin mümkün olduğunun sınırlarını keşfetmek.',
            bioTitle: 'Biyografi',
            skills: 'Yetenekler & Araçlar',
            techStackTitle: 'Teknoloji Yığını',
            experience: 'Deneyim',
            contactTelegram: 'Telegram ile İletişime Geç',
            sendEmail: 'E-posta Gönder'
        },
        projects: {
            title: 'Projeler',
            viewProject: 'Projeyi Görüntüle',
            visitSite: 'Siteyi Ziyaret Et',
            techTools: 'Teknolojiler ve Araçlar',
            technologies: 'Kullanılan Teknolojiler',
            items: {
                alanya: { title: 'Alanya Holidays', desc: 'Alanya, Türkiye\'de premium kiralama platformu.' },
                iffa: { title: 'Iffa Tech', desc: 'Kurumsal teknik çözümler ve yazılım.' },
                kassimova: { title: 'Kassimova Design', desc: 'Mimarlık ve iç mimarlık portföyü.' }
            }
        },
        common: {
            done: 'Tamam'
        },
        aboutMac: {
            title: 'Portfolio OS',
            version: 'Sürüm 1.0 (Sonoma esintili)',
            display: 'Ekran',
            displayValue: 'Liquid Retina XDR, React Destekli',
            processor: 'İşlemci',
            processorValue: 'Human Intelligence + AI Assist',
            memory: 'Bellek',
            memoryValue: 'Full Stack Knowledge Base',
            startupDisk: 'Başlangıç Diski',
            startupDiskValue: 'Vite + TypeScript',
            footer: 'Chingiz Salikhov tarafından tasarlandı и geliştirildi © 2026'
        },
        contact: {
            title: 'İletişim',
            name: 'İsim',
            email: 'E-posta',
            message: 'Mesaj',
            send: 'Gönder',
            sending: 'Gönderiliyor...',
            success: 'Mesaj başarıyla gönderildi!',
            error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
            getInTouch: 'İletişime Geçin',
            description: "Aklınızda bir proje mi var veya sadece merhaba mı demek istiyorsunuz? Sizden haber almaktan memnuniyet duyarım."
        },
        privacy: {
            title: 'Gizlilik Politikası',
            updated: 'Son güncelleme: Şubat 2026',
            s1Title: '1. Veri Toplama',
            s1Desc: 'Bu kişisel bir portföy web sitesidir. İzleme çerezleri veya analitik araçlar kullanmıyoruz. Sadece İletişim formu aracılığıyla kendi isteğinizle sağladığınız veriler toplanır.',
            s2Title: '2. Verilerinizi Nasıl Kullanıyoruz',
            s2Desc: 'İletişim formu aracılığıyla gönderilen bilgiler yalnızca talebinizi yanıtlamak amacıyla kullanılır. Bilgilerinizi üçüncü taraflarla paylaşmıyoruz.',
            s3Title: '3. Yerel Depolama',
            s3Desc: 'UI tercihlerinizi (pencere konumları veya dil ayarları gibi) hatırlamak için yalnızca standart tarayıcı teknolojilerini kullanabiliriz.',
            s4Title: '4. Haklarınız',
            s4Desc: 'Herhangi bir yazışmanın silinmesini talep etme hakkına sahipsiniz. Bunun için doğrudan bizimle iletişime geçebilirsiniz.'
        },
        hero: {
            greeting: 'Merhaba, ben',
            name: 'Cengiz',
            role: 'Ürün Tasarımcısı',
            location: 'İstanbul, Türkiye'
        },
        systemAlert: {
            settingsTitle: 'Ayarlar',
            languageChanged: 'Dil Türkçeye değiştirildi'
        }
    }
};

type NestedKeyOf<ObjectType extends object> =
    { [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`
    }[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof translations.en>;
