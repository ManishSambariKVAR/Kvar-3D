import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Products', href: '#products' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        // If we're not on the homepage route, navigate there with a hash.
        if (location.pathname !== '/') {
            navigate({ pathname: '/', hash: href });
            return;
        }

        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            id="navbar"
            className={`fixed left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'top-4 mx-4 max-w-7xl lg:mx-auto bg-surface/70 backdrop-blur-2xl border border-border/50 shadow-sm rounded-full py-3'
                    : 'top-0 bg-transparent py-6 border-b-0'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); handleClick('#hero'); }}
                    className="flex items-center gap-2 group ml-2"
                >
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center
                          shadow-md shadow-accent/20 transition-all duration-300">
                        <span className="text-white font-extrabold text-sm tracking-tighter">K</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-lg font-extrabold tracking-tight text-heading">KVAR</span>
                        <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted">Technologies</span>
                    </div>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => handleClick(link.href)}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-muted
                         hover:text-heading hover:bg-white/5 transition-all duration-200 cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
                        className="hidden sm:inline-flex btn-primary !py-2.5 !px-6"
                    >
                        Get a Quote
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} className="text-heading" /> : <Menu size={22} className="text-heading" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pb-4 pt-2 space-y-1 bg-surface/95 backdrop-blur-xl border-t border-border mt-2">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => handleClick(link.href)}
                            className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-muted
                         hover:text-heading hover:bg-white/5 transition-all duration-200 cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
