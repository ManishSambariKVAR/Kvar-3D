import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';

const contactInfo = [
    {
        icon: MapPin,
        title: 'Address',
        lines: ['KVAR Technologies Pvt. Ltd.', 'Mumbai, Maharashtra, India'],
    },
    {
        icon: Phone,
        title: 'Phone',
        lines: ['+91 79 4266 4272'],
    },
    {
        icon: Mail,
        title: 'Email',
        lines: ['info@kvartech.com'],
    },
    {
        icon: Clock,
        title: 'Working Hours',
        lines: ['Mon–Fri: 9:00 AM – 6:00 PM', 'Sat: 9:00 AM – 1:00 PM'],
    },
];

export default function Contact() {
    return (
        <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-subtle-gradient pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    tag="Get in Touch"
                    title="Let's Build Together"
                    subtitle="Have a project in mind? Get in touch and we'll send you a quote within 24 hours."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="p-10 rounded-[2rem] border border-black/5 dark:border-white/5 bg-surface shadow-md"
                    >
                        <h3 className="text-xl font-bold text-heading mb-6">Send us a Message</h3>
                        <ContactForm />
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="space-y-6"
                    >
                        {contactInfo.map((info) => {
                            const Icon = info.icon;
                            return (
                                <div
                                    key={info.title}
                                    className="flex items-start gap-4 p-6 rounded-2xl border border-black/5 dark:border-white/5 bg-surface shadow-sm
                             hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-full bg-accent/5 border border-accent/10
                                  flex items-center justify-center flex-shrink-0">
                                        <Icon size={24} className="text-accent" />
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-base font-semibold text-heading mb-1">{info.title}</h4>
                                        {info.lines.map((line) => (
                                            <p key={line} className="text-sm text-muted">{line}</p>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Map placeholder */}
                        <div className="h-[220px] rounded-[2rem] border border-black/5 dark:border-white/5 bg-surface-2 overflow-hidden
                            flex items-center justify-center relative shadow-sm">
                            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                            <div className="text-center">
                                <MapPin size={32} className="text-accent/40 mx-auto mb-2" />
                                <p className="text-sm text-muted">Mumbai, Maharashtra, India</p>
                                <a
                                    href="https://maps.google.com?q=19.03267000,72.84285000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-accent hover:underline mt-1 inline-block"
                                >
                                    View on Google Maps →
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
