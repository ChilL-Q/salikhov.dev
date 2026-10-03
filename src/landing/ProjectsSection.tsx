import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { PROJECTS } from '../content/projects';

export const ProjectsSection = () => {
    const { d } = useI18n();

    return (
        <section id="work" className="mx-auto max-w-[1168px] px-6 py-12 md:py-20">
            <div data-reveal className="mb-8 text-center md:mb-14">
                <p className="mb-4 text-[13px] font-semibold uppercase tracking-[3px] text-accent">{d.projects.subtitle}</p>
                <h2 className="text-[clamp(32px,5vw,48px)] font-extrabold tracking-[-1.5px]">
                    <span className="gradient-text">{d.projects.title}</span>
                </h2>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PROJECTS.map((project, i) => {
                    const item = d.projects.items[project.id];
                    return (
                        <li key={project.id} data-reveal style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as CSSProperties}>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-tint/10 bg-tint/[0.045] transition-colors duration-300 hover:border-accent/40"
                            >
                                <div className="flex aspect-[16/10] items-center justify-center" style={{ background: project.bg }}>
                                    <img
                                        src={project.logo.src}
                                        width={project.logo.width}
                                        height={project.logo.height}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        className="h-auto max-h-[55%] w-auto max-w-[62%] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-2 p-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <ArrowUpRight size={18} aria-hidden="true" className="text-ink-3 transition-colors group-hover:text-accent" />
                                    </div>
                                    <p className="text-[15px] leading-relaxed text-ink-2">{item.desc}</p>
                                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-3 font-mono text-xs text-ink-3">
                                        {project.tags.map(tag => (
                                            <li key={tag} className="rounded-full border border-tint/10 px-2.5 py-1">{tag}</li>
                                        ))}
                                    </ul>
                                </div>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
