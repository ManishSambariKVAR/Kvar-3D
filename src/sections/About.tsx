import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import StatsCounter from '../components/StatsCounter';
import ModelViewer from '../three/ModelViewer';

const stats = [
    { end: 20, suffix: '+', label: 'Years Experience' },
    { end: 500, suffix: '+', label: 'Products' },
    { end: 1000, suffix: '+', label: 'Clients' },
    { end: 50, suffix: '+', label: 'Countries' },
];

export default function About() {
    return (
        <section id="about" className="relative py-24 lg:py-32 overflow-hidden bg-surface-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    tag="About Us"
                    title="KVAR Technologies"
                    subtitle="Pioneering industrial electronics since 2003"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <p className="text-base text-muted leading-relaxed mb-6">
                            <span className="font-semibold text-heading">KVAR Technologies Private Limited</span> is
                            a leading manufacturer, supplier and exporter of industrial electronic instruments based
                            in Mumbai, Maharashtra, India.
                        </p>
                        <p className="text-base text-muted leading-relaxed mb-6">
                            We fabricate a wide range of industrial control equipment, measuring instruments,
                            test & measurement products, production monitoring systems, consumer electronic
                            products, and process control equipment — all custom-built to client specifications.
                        </p>
                        <p className="text-base text-muted leading-relaxed mb-8">
                            Our focus is on enhancing operational efficiencies by providing actionable, real-time
                            information that enables prompt action. From factory floors to outdoor environmental
                            monitoring, our instruments power critical decisions across industries.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-8">
                            <div className="flex items-center gap-2 text-sm text-muted bg-surface rounded-full shadow-sm border-black/5 px-5 py-3">
                                <span className="font-semibold text-heading">GST:</span> 27AAHCK0691H1ZE
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted bg-surface rounded-full shadow-sm border-black/5 px-5 py-3">
                                <span className="font-semibold text-heading">IEC:</span> AAHCK0691H
                            </div>
                        </div>
                    </motion.div>

                    {/* 3D Model */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-[400px] bg-surface rounded-[2rem] border border-black/5 dark:border-white/5 relative overflow-hidden shadow-sm"
                    >

                        <ModelViewer
                            modelPath="/display.glb"
                            className="w-full h-full"
                            autoRotateSpeed={0.5}
                        />
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 rounded-[2rem] border border-black/5 dark:border-white/5 bg-surface mt-16 shadow-sm"
                >
                    {stats.map((s) => (
                        <StatsCounter key={s.label} {...s} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
