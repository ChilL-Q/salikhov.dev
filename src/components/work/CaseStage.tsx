import type { Stage } from '../../content/cases';
import { workImage } from '../../content/work-images';
import { BrowserFrame, PhoneFrame } from './Frames';

interface CaseStageProps {
    stage: Stage;
    /** srcset `sizes` for the desktop screenshot and for each phone */
    sizes: { browser: string; phone: string };
    /** alt for the main screenshot; the rest of the composition repeats it */
    alt?: string;
    /** the case page's first screen: load eagerly */
    priority?: boolean;
    className?: string;
}

/**
 * The "stage" every project is shown on: the site in a dark browser window with its phone version on
 * top, or two phones for mobile-first products — on one plain dark surface, so light and dark sites
 * read as one set. Demo-data notes are captions next to it, not overlays.
 */
export function CaseStage({ stage, sizes, alt = '', priority, className = '' }: CaseStageProps) {
    return (
        <div
            className={`@container relative aspect-[16/11] overflow-hidden bg-raised ${className}`}
        >
            {stage.kind === 'browser-phone' ? (
                <>
                    <BrowserFrame
                        url={stage.url}
                        image={workImage(stage.desktop)}
                        sizes={sizes.browser}
                        alt={alt}
                        priority={priority}
                        w="80cqw"
                        className="absolute top-[10%] left-[7%] transition-transform duration-700 ease-out group-hover:-translate-y-1.5"
                    />
                    <PhoneFrame
                        image={workImage(stage.mobile)}
                        sizes={sizes.phone}
                        w="23cqw"
                        className="absolute right-[6%] -bottom-[14%] transition-transform duration-700 ease-out group-hover:-translate-y-3"
                    />
                </>
            ) : (
                <>
                    <PhoneFrame
                        image={workImage(stage.phones[0])}
                        sizes={sizes.phone}
                        alt={alt}
                        priority={priority}
                        w="27cqw"
                        className="absolute top-[9%] left-[21%] transition-transform duration-700 ease-out group-hover:-translate-y-2"
                    />
                    <PhoneFrame
                        image={workImage(stage.phones[1])}
                        sizes={sizes.phone}
                        w="27cqw"
                        className="absolute top-[15%] left-[52%] transition-transform duration-700 ease-out group-hover:-translate-y-3"
                    />
                </>
            )}
        </div>
    );
}
