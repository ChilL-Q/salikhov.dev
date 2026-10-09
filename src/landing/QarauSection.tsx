import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import qarauLogo from '../assets/projects-logos/qarau.svg';

const QARAU_URL = 'https://qarau.kz';
const POINTS = ['readonly', 'numbers', 'telegram'] as const;

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { delay, duration: 0.7, ease },
});

/** My startup, told by its founder: what it does and why, with the product's own site one click away. */
export const QarauSection = () => {
    const { t } = useLanguage();

    const facts = [
        { label: t('qarau.roleLabel'), value: 'Founder & CEO' },
        { label: t('qarau.stageLabel'), value: t('qarau.stage') },
        { label: t('qarau.forLabel'), value: t('qarau.forValue') },
    ];

    return (
        <section id="qarau" className="qarau-section">
            <div className="qarau-top">
                <motion.div {...fadeUp()} className="qarau-copy">
                    <p className="qarau-eyebrow">{t('qarau.eyebrow')}</p>
                    <h2 className="qarau-title">
                        <span className="gradient-text">Qarau AI</span>
                    </h2>
                    <p className="qarau-lead">{t('qarau.lead')}</p>
                    <p className="qarau-story">{t('qarau.story')}</p>
                    <dl className="qarau-facts">
                        {facts.map(f => (
                            <div key={f.label}>
                                <dt>{f.label}</dt>
                                <dd>{f.value}</dd>
                            </div>
                        ))}
                    </dl>
                </motion.div>

                <motion.a
                    {...fadeUp(0.1)}
                    href={QARAU_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qarau-card"
                    aria-label={t('qarau.site')}
                >
                    <img src={qarauLogo} alt="" width={3696} height={1403} className="qarau-card-logo" loading="lazy" draggable={false} />
                    <span className="qarau-card-link">
                        qarau.kz <ArrowUpRight size={15} />
                    </span>
                </motion.a>
            </div>

            <ul className="qarau-points">
                {POINTS.map((key, i) => (
                    <motion.li key={key} {...fadeUp(0.08 * i)}>
                        <h3>{t(`qarau.points.${key}.title`)}</h3>
                        <p>{t(`qarau.points.${key}.desc`)}</p>
                    </motion.li>
                ))}
            </ul>

            <style>{`
                .qarau-section {
                    padding: 80px 24px 40px;
                    max-width: 1168px; /* 1120 content + 2×24 padding, same column as the other sections */
                    margin: 0 auto;
                }
                .qarau-top {
                    display: grid;
                    grid-template-columns: 1.15fr 0.85fr;
                    gap: 56px;
                    align-items: center;
                }
                .qarau-eyebrow {
                    color: var(--accent-orange);
                    font-size: 13px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin-bottom: 16px;
                }
                .qarau-title {
                    font-size: clamp(32px, 5vw, 48px);
                    font-weight: 800;
                    letter-spacing: -1.5px;
                    margin-bottom: 24px;
                }
                .qarau-lead {
                    font-size: clamp(17px, 1.6vw, 20px);
                    line-height: 1.55;
                    color: var(--text-primary);
                    margin-bottom: 16px;
                    max-width: 580px;
                }
                .qarau-story {
                    font-size: 15px;
                    line-height: 1.7;
                    color: var(--text-secondary);
                    max-width: 580px;
                }
                .qarau-facts {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px 40px;
                    margin-top: 32px;
                }
                .qarau-facts dt {
                    font-size: 12px;
                    color: var(--text-tertiary);
                    margin-bottom: 4px;
                }
                .qarau-facts dd {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--text-primary);
                }

                /* the product's own brand colours on its card, as in the projects carousel */
                .qarau-card {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    aspect-ratio: 4 / 3;
                    padding: 48px;
                    border-radius: var(--radius-xl);
                    background: #0f1820;
                    border: 1px solid rgb(var(--tint-rgb) / 0.13);
                    transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .qarau-card-logo {
                    width: 78%;
                    height: auto;
                    user-select: none;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .qarau-card-link {
                    position: absolute;
                    left: 24px;
                    bottom: 20px;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--text-secondary);
                    transition: color 0.25s;
                }
                @media (hover: hover) {
                    .qarau-card:hover {
                        border-color: rgb(var(--accent-rgb) / 0.6);
                        box-shadow: 0 30px 60px -20px rgb(0 0 0 / 0.6);
                    }
                    .qarau-card:hover .qarau-card-logo { transform: scale(1.03); }
                    .qarau-card:hover .qarau-card-link { color: var(--accent-orange); }
                }

                .qarau-points {
                    list-style: none;
                    margin: 56px 0 0;
                    padding: 0;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 32px;
                }
                .qarau-points li {
                    padding-top: 20px;
                    border-top: 1px solid rgb(var(--tint-rgb) / 0.13);
                }
                .qarau-points h3 {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 8px;
                }
                .qarau-points p {
                    font-size: 14px;
                    line-height: 1.65;
                    color: var(--text-secondary);
                }

                @media (max-width: 900px) {
                    .qarau-top { grid-template-columns: 1fr; gap: 40px; }
                    .qarau-card { aspect-ratio: 16 / 9; padding: 32px; }
                    .qarau-card-logo { width: 62%; }
                }
                @media (max-width: 768px) {
                    .qarau-section { padding: 50px 24px 20px; }
                    .qarau-points { grid-template-columns: 1fr; gap: 24px; margin-top: 40px; }
                }
            `}</style>
        </section>
    );
};
