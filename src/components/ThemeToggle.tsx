import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [dark, setDark] = useState(() => {
        if (typeof window === 'undefined') return true;
        const stored = localStorage.getItem('kvar-theme');
        return stored ? stored === 'dark' : true;
    });

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', dark ? 'dark' : 'light');
        localStorage.setItem('kvar-theme', dark ? 'dark' : 'light');
    }, [dark]);

    return (
        <button
            id="theme-toggle"
            onClick={() => setDark((d) => !d)}
            className="relative p-2 transition-all duration-300 cursor-pointer border border-border
                 bg-surface-2 hover:bg-surface hover:border-accent"
            aria-label="Toggle theme"
        >
            <Sun
                size={18}
                className={`absolute inset-0 m-auto transition-all duration-500
          ${dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          text-amber-400`}
            />
            <Moon
                size={18}
                className={`transition-all duration-500
          ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          text-blue-300`}
            />
        </button>
    );
}
