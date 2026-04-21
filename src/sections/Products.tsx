import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { products, categories, type Category } from '../data/products';

type ProductsSectionProps = {
    limit?: number;
    showViewAll?: boolean;
    modelsOnly?: boolean;
};

export default function Products({ limit, showViewAll = false, modelsOnly = false }: ProductsSectionProps) {
    const [activeCategory, setActiveCategory] = useState<Category>('All');

    const baseProducts = modelsOnly ? products.filter(p => p.modelPath !== null) : products;

    const filtered =
        activeCategory === 'All'
            ? baseProducts
            : baseProducts.filter((p) => p.category === activeCategory);

    const visible = typeof limit === 'number' ? filtered.slice(0, Math.max(0, limit)) : filtered;

    return (
        <section id="products" className="relative py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    tag="Our Products"
                    title="Industrial Solutions"
                    subtitle="From precision data loggers to large-format LED displays — explore our comprehensive range of industrial electronic products."
                />

                {/* Category filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border
                ${activeCategory === cat
                                    ? 'bg-heading border-heading text-surface shadow-md'
                                    : 'bg-transparent text-muted border-border hover:border-muted hover:text-heading'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                    <AnimatePresence mode="popLayout">
                        {visible.map((product, i) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={i}
                                to={`/products/${product.id}`}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {showViewAll && (
                    <div className="mt-10 flex justify-center">
                        <Link to="/products" className="btn-secondary">
                            View all products
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
