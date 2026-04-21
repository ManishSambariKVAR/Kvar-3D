import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Product } from '../data/products';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    product: Product;
    index: number;
    to: string;
}

export default function ProductCard({ product, index, to }: Props) {
    // Dynamically get icon component
    const iconMap = Icons as unknown as Record<string, ComponentType<{ size?: number; className?: string }>>;
    const IconComponent = iconMap[product.icon] ?? Icons.Box;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative cursor-pointer rounded-[2rem] bg-card border border-black/5 dark:border-white/5
                 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 overflow-hidden"
        >
            {/* Subtle gradient glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <Link to={to} className="relative block p-6">
                {/* Image / Thumbnail placeholder */}
                <div className="w-full h-40 rounded-2xl bg-surface-2 border border-black/5 dark:border-white/5
                        mb-6 overflow-hidden relative group-hover:border-accent transition-all duration-300">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />

                    {/* Floating Icon */}
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/80 dark:bg-black/80 backdrop-blur-md flex items-center justify-center">
                        <IconComponent size={20} className="text-accent" />
                    </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-heading mb-2 group-hover:text-accent transition-colors duration-300">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed line-clamp-3">
                    {product.description}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent/70 bg-accent/5
                          px-3 py-1 rounded-full border border-accent/10">
                        {product.category}
                    </span>

                    {product.modelPath && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400/70 bg-violet-400/5
                            px-3 py-1 rounded-full border border-violet-400/10 flex items-center gap-1">
                            <Icons.Box size={10} />
                            3D
                        </span>
                    )}
                </div>

                {/* Hover arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100
                        translate-x-2 group-hover:translate-x-0
                        transition-all duration-300">
                    <Icons.ArrowUpRight size={18} className="text-accent" />
                </div>
            </Link>
        </motion.div>
    );
}
