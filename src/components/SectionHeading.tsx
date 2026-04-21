import { motion } from 'framer-motion';

interface Props {
    tag?: string;
    title: string;
    subtitle?: string;
}

export default function SectionHeading({ tag, title, subtitle }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12 lg:mb-16"
        >
            {tag && (
                <span
                    className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase
                     text-accent bg-accent/10 border border-accent/20
                     rounded-full px-4 py-1.5 mb-4"
                >
                    {tag}
                </span>
            )}

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-heading leading-tight">
                {title}
            </h2>

            {subtitle && (
                <p className="mt-4 text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}

            {/* Animated underline */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="mt-6 mx-auto h-1.5 w-20 bg-accent origin-center"
            />
        </motion.div>
    );
}
