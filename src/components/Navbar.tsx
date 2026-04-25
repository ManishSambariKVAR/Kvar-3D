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
            className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'top-3 mx-auto max-w-5xl px-4'
                    : 'top-0 px-0'
            }`}
        >
            <div className={`transition-all duration-500 ${
                scrolled
                    ? 'bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl px-5 py-2.5 shadow-lg shadow-black/30'
                    : 'bg-transparent px-8 py-4 max-w-7xl mx-auto'
            }`}>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => { e.preventDefault(); handleClick('#hero'); }}
                        className="flex items-center gap-3 group"
                    >
                        <img
                            src="/logo.png"
                            alt="KVAR Logo"
                            className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"

                        />
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleClick(link.href)}
                                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white/50
                                     hover:text-white hover:bg-white/8 transition-all duration-200 cursor-pointer
                                     tracking-wide"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold
                                 bg-blue-600 hover:bg-blue-500 text-white
                                 px-4 py-2 rounded-lg transition-all duration-200
                                 shadow-md shadow-blue-600/30 hover:shadow-blue-500/40"
                        >
                            Get a Quote
                        </a>
                        <button
                            onClick={() => setMobileOpen((o) => !o)}
                            className="md:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen
                                ? <X size={18} className="text-white/70" />
                                : <Menu size={18} className="text-white/70" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 mx-4 ${
                mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="mt-1 bg-black/80 backdrop-blur-2xl border border-white/10
                          rounded-2xl px-3 py-3 space-y-0.5">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => handleClick(link.href)}
                            className="block w-full text-left px-4 py-2.5 rounded-xl text-sm
                                 font-medium text-white/60 hover:text-white hover:bg-white/8
                                 transition-all duration-200 cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}
                    <div className="pt-2 px-2">
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
                            className="block text-center text-xs font-semibold bg-blue-600
                                 text-white px-4 py-2.5 rounded-xl"
                        >
                            Get a Quote
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}