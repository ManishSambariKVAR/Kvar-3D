import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ModelViewer from '../components/ModelViewer';

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-[100vh] flex flex-col items-center bg-slate-950 overflow-hidden pt-24 pb-8"
        >
            {/* Glowing Lights Behind Model (Centered in the viewport) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[800px] h-[70%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] max-w-[500px] h-[50%] bg-cyan-400/15 blur-[80px] rounded-full pointer-events-none z-0" />

            {/* Vibrant gradient highlights at the very top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-gradient-to-r from-blue-600/20 via-cyan-400/20 to-purple-600/20 blur-[100px] pointer-events-none rounded-full z-0" />

            {/* 3D Model Area - Rendered above the background lights */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-10 pointer-events-auto"
            >
                <ModelViewer
                    modelPath=""
                    className="w-full h-full"
                    autoRotateSpeed={0.4}
                    showHint={false}
                    bgColor="transparent"
                    enableZoom={false}
                    cameraPosition={[0, 0.5, 7.5]} // medium size
                />
            </motion.div>

            {/* Main Container - Text safely at Top */}
            <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pointer-events-none mt-4 shrink-0">
                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] font-bold tracking-tighter text-heading leading-[1.05]"
                >
                    Precision. <br className="hidden sm:block" />
                    <span className="text-accent relative inline-block">
                        Redefined.
                        <div className="absolute -bottom-2 left-0 w-full h-[0.1em] bg-accent/20 rounded-full" />
                    </span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg sm:text-2xl text-muted font-medium mt-6 max-w-2xl mx-auto leading-relaxed"
                >
                    High-end smart displays & precision instruments trusted by 1000+ modern enterprises worldwide.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto"
                >
                    <a
                        href="#products"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="btn-primary group"
                    >
                        Explore the line
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="btn-secondary backdrop-blur-md bg-white/5 border-white/10"
                    >
                        Contact Sales
                    </a>
                </motion.div>
            </div>

            {/* Spacer to push the reference text to the bottom */}
            <div className="flex-1 pointer-events-none" />

            {/* Slow text reference at the absolutely bottom */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="relative z-20 flex flex-col items-center pointer-events-auto mt-auto pb-4"
            >
                <p className="text-muted/80 text-sm font-medium tracking-wide mb-1.5 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Interactive 3D Digital Clock
                </p>
                <a
                    href="#products"
                    onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-accent hover:text-accent-light hover:underline transition-colors cursor-pointer"
                >
                    Like this? We make more. See our products &rarr;
                </a>
            </motion.div>
        </section>
    );
}
