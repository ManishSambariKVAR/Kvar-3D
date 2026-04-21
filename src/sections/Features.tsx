import { motion } from 'framer-motion';
import {
    Shield,
    Cpu,
    Globe,
    Wifi,
    Activity,
    Settings,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const features = [
    {
        icon: Shield,
        title: 'ISO Certified Quality',
        description:
            'All products manufactured under strict ISO quality standards with rigorous testing at every stage.',
        color: 'text-green-400',
        bg: 'bg-green-400/10',
        border: 'border-green-400/20',
    },
    {
        icon: Settings,
        title: 'Custom Solutions',
        description:
            'Tailor-made instruments and displays designed to your exact specifications and requirements.',
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20',
    },
    {
        icon: Globe,
        title: '20+ Years Experience',
        description:
            'Two decades of expertise in manufacturing industrial electronics and precision instruments.',
        color: 'text-amber-400',
        bg: 'bg-amber-400/10',
        border: 'border-amber-400/20',
    },
    {
        icon: Wifi,
        title: 'IoT Enabled',
        description:
            'Cloud-connected products with real-time dashboards, remote monitoring and data analytics.',
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10',
        border: 'border-cyan-400/20',
    },
    {
        icon: Activity,
        title: 'Real-Time Monitoring',
        description:
            'Live data display with high refresh rates, Modbus communication, and multi-sensor support.',
        color: 'text-rose-400',
        bg: 'bg-rose-400/10',
        border: 'border-rose-400/20',
    },
    {
        icon: Cpu,
        title: 'Made in India',
        description:
            'Proudly designed and manufactured in Mumbai, India — supporting the Atmanirbhar Bharat initiative.',
        color: 'text-violet-400',
        bg: 'bg-violet-400/10',
        border: 'border-violet-400/20',
    },
];

export default function Features() {
    return (
        <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-black/5 pt-16 lg:pt-24">
                <SectionHeading
                    tag="Why Choose Us"
                    title="Built for Reliability"
                    subtitle="Two decades of engineering excellence powering industries across India and beyond."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feat, i) => {
                        const Icon = feat.icon;
                        return (
                            <motion.div
                                key={feat.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                                whileHover={{ y: -4 }}
                                className="group relative p-8 border border-border bg-card
                           hover:border-accent hover:-translate-y-1 hover:shadow-md hover:shadow-accent/5
                           transition-all duration-300"
                            >
                                {/* Corner accent */}
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-transparent group-hover:border-accent transition-colors" />

                                {/* Icon */}
                                <div
                                    className={`w-12 h-12 ${feat.bg} border ${feat.border}
                              flex items-center justify-center mb-6`}
                                >
                                    <Icon size={22} className={feat.color} />
                                </div>

                                <h3 className="text-lg font-bold text-heading mb-2">{feat.title}</h3>
                                <p className="text-sm text-muted leading-relaxed">{feat.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
