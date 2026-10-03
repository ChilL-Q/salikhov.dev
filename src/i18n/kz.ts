/**
 * Kazakh dictionary from the previous version of the site — not wired up yet (EN + RU only for now).
 * Before adding /kz: bring it to the `Dictionary` shape (see en.ts), add 'kz' to LANGS and
 * a /kz prefix in routes.ts, and load the cyrillic-ext font subsets (ә, ғ, қ, ң, ө, ұ, ү, һ, і).
 */
export const kz = {
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
        role: 'Full Stack Әзірлеуші',
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
            kassimova: { title: 'Kassimova Design', desc: 'Сәулет және интерьер дизайны портфолиосы.' },
            abai: { title: 'AB AI', desc: 'Автосервис клиенттерін WhatsApp арқылы ИИ-агентпен қайтару.' },
            azhar: { title: 'Azhar Trading', desc: 'Халяль инвестиция және қор биржасында оқыту.' },
            thirdtime: { title: '3й Тайм', desc: 'Спорт-барға арналған QR-мәзір, админ-панелі мен стоп-парағы бар.' },
            breakfast: { title: 'The Breakfast', desc: 'Астанадағы кафенің электрондық мәзірі.' },
        },
    },
    contact: {
        getInTouch: 'Хат жазу',
        description: 'Жобаңыз бар ма немесе жай ғана сәлемдескіңіз келе ме? Хабарласыңыз!',
    },
    footer: {
        copyright: 'Чингиз Салихов әзірлеген © 2026',
    },
};
