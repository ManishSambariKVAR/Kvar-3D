import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Props {
    end: number;
    suffix?: string;
    label: string;
    duration?: number;
}

export default function StatsCounter({ end, suffix = '', label, duration = 2000 }: Props) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });
    const [count, setCount] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        if (!isVisible || started.current) return;
        started.current = true;

        const startTime = performance.now();
        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isVisible, end, duration]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-heading">
                {count}
                <span className="text-accent">{suffix}</span>
            </div>
            <div className="mt-2 text-sm text-muted font-medium uppercase tracking-wider">{label}</div>
        </div>
    );
}
