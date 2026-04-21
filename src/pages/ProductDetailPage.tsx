import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ModelViewer from '../components/ModelViewer';
import AQMTraceShowcase from '../components/AQMTraceShowcase';
import AQMModel3D from '../components/AQMModel3D';
import { products } from '../data/products';

/* ── Sensor overlay panel definitions ── */

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-surface border border-border p-10 text-center">
            <p className="text-sm text-muted">Product not found.</p>
            <Link to="/products" className="btn-primary inline-flex mt-6">
              Back to products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Premium scroll showcase for the air quality monitor
  if (product.id === 'air-quality-monitor') {
    return (
      <>
        {/* Back nav pinned over the showcase */}
        <div style={{ position: 'fixed', top: '5rem', left: '1.5rem', zIndex: 50 }}>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </Link>
        </div>
        <AQMTraceShowcase />
        {/* CTA after showcase */}
        <section className="py-20 bg-[#050508] text-center">
          <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
          <p className="text-white/50 max-w-md mx-auto mb-8 text-sm">{product.description}</p>
          <div className="flex justify-center gap-4">
            <Link to="/#contact" className="btn-primary">Get Best Quote</Link>
            <Link to="/products" className="btn-secondary">View more products</Link>
          </div>
        </section>
      </>
    );
  }

  // 3D animated model for air quality monitoring solution
  if (product.id === 'air-quality-monitoring-solution') {
    return (
      <>
        {/* Back nav */}
        <div style={{ position: 'fixed', top: '5rem', left: '1.5rem', zIndex: 50 }}>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </Link>
        </div>

        <AQMModel3D />

        {/* CTA after 3D model */}
        <section className="py-20 bg-black text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Monitor Air Quality?</h3>
          <p className="text-white/50 max-w-md mx-auto mb-8 text-sm">Get a custom quote for your air quality monitoring needs</p>
          <div className="flex justify-center gap-4">
            <Link to="/#contact" className="btn-primary">Get Best Quote</Link>
            <Link to="/products" className="btn-secondary">View more products</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      {/* Fullscreen stage */}
      <div className="absolute inset-0">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[900px] rounded-full bg-blue-500/12 blur-[130px]" />
          <div className="absolute top-24 -left-52 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[120px]" />
          <div className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-violet-500/12 blur-[130px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45 dark:from-black/35 dark:to-black/55" />
        </div>

        {/* 3D model (main focus) */}
        <div className="absolute inset-0">
          {product.modelPath ? (
            <ModelViewer
              modelPath={product.modelPath}
              className="w-full h-full"
              autoRotateSpeed={0.6}
              showHint
              enableZoom
              bgColor="transparent"
              cameraPosition={[0, 0.8, 8]}
            />
          ) : (
            <div className="absolute inset-0">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
            </div>
          )}
        </div>
      </div>

      {/* Overlay UI */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-10"
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to products
          </Link>

          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
          >
            Contact sales
            <ExternalLink size={16} />
          </Link>
        </div>

        <div className="mt-10 max-w-2xl">
          <div className="inline-flex items-center gap-2">
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur-xl">
              {product.category}
            </span>
            {product.modelPath && (
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 bg-violet-500/15 border border-violet-300/20 rounded-full px-3 py-1 backdrop-blur-xl">
                Interactive 3D
              </span>
            )}
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05] drop-shadow-[0_12px_60px_rgba(0,0,0,0.55)]">
            {product.name}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/#contact" className="btn-primary">
              Get Best Quote
            </Link>
            <Link to="/products" className="btn-secondary">
              View more products
            </Link>
          </div>

          <div className="mt-6 text-xs text-white/60 leading-relaxed">
            Drag to rotate · Scroll / pinch to zoom
          </div>
        </div>
      </motion.div>
    </section>
  );
}

