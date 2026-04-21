import { Mail, MapPin, Phone } from 'lucide-react';

const productLinks = [
    'Data Loggers',
    'Indicators Display',
    'Digital Clocks',
    'IoT Products',
    'Air Quality Monitors',
    'LED Display Boards',
];

const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Products', href: '#products' },
    { label: 'Features', href: '#features' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Footer() {
    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="relative border-t border-border bg-surface">
            {/* Gradient top line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* About */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center">
                                <span className="text-white font-extrabold text-xs">K</span>
                            </div>
                            <span className="text-lg font-extrabold text-heading">KVAR</span>
                        </div>
                        <p className="text-sm text-muted leading-relaxed mb-4">
                            Manufacturers of precision industrial instruments, smart displays & IoT
                            solutions. Enhancing efficiencies with real-time information since 2003.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center text-muted hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-200 font-bold text-xs">FB</a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center text-muted hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-200 font-bold text-xs">IN</a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center text-muted hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-200 font-bold text-xs">X</a>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-heading mb-4">Products</h4>
                        <ul className="space-y-2.5">
                            {productLinks.map((name) => (
                                <li key={name}>
                                    <button
                                        onClick={() => scrollTo('#products')}
                                        className="text-sm text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
                                    >
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-heading mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <button
                                        onClick={() => scrollTo(href)}
                                        className="text-sm text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-heading mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-muted">
                                <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                                <span>Mumbai, Maharashtra, India</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted">
                                <Phone size={16} className="text-accent flex-shrink-0" />
                                <span>+91 79 4266 4272</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted">
                                <Mail size={16} className="text-accent flex-shrink-0" />
                                <span>info@kvartech.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row
                        items-center justify-between gap-2 text-xs text-muted">
                    <span>© 2026 KVAR Technologies Pvt. Ltd. All rights reserved.</span>
                    <span>Made in India 🇮🇳</span>
                </div>
            </div>
        </footer>
    );
}
