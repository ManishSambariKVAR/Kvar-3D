import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ModelViewer from '../components/ModelViewer';
import AQMTraceShowcase from '../components/AQMTraceShowcase';
import ImageSequenceShowcase from '../components/ImageSequenceShowcase';
import { products } from '../data/products';
import type { SensorPanelData } from '../components/SensorOverlayPanel';

/* ── Sensor overlay panel definitions ── */
const airQualityPanels: SensorPanelData[] = [
  /* ── 1. Model / spec sheet  (frames 1–14) ── */
  {
    id: 'model-specs',
    startFrame: 0,
    endFrame: 13,
    position: 'right',
    accent: 'cyan',
    title: 'KVAR Air Quality Monitoring',
    subtitle: 'Complete monitoring solution — AQI Unit + Remote Display',
    isSpecSheet: true,
    details: [
      'AQI Unit',
      '• 16×2 LCD display',
      '• 4 keys for settings',
      '• Built-in RTC for Date & Time',
      '• Inbuilt sensors:',
      '○ PM2.5',
      '○ PM10',
      '○ Temperature',
      '○ Humidity',
      '○ AQI',
      '• SD Card storage',
      '• Weatherproof polycarbonate cabinet',
      '• Data download via Webpage',
      '• Wi-Fi connectivity to Display',
      '• Supply 110-230 VAC / 50-60 Hz',
      'Remote LED Display',
      '• Type: LED Dot Matrix',
      '• View: Single-sided',
      '• Colour: RGB',
      '• Daylight-visible',
      '• Size: 3×4 ft (P6 pixel)',
      '• Wi-Fi to AQI Unit',
      '• MS powder-coated, IP65',
      '• Supply 110-230 VAC / 50 Hz',
    ],
  },

  /* ── 2. PM10 sensor  (frames 51–64) ── */
  {
    id: 'pm10',
    startFrame: 50,
    endFrame: 63,
    position: 'left',
    accent: 'amber',
    title: 'PM10',
    subtitle: 'Particulate Matter ≤ 10 µm — coarse inhalable particles',
    reading: '26',
    unit: 'µg/m³',
    details: [
      '• Coarse particles from dust, pollen, mold',
      '• Monitored continuously by laser sensor',
      '• Real-time display on LED board',
    ],
    ranges: {
      good: '0-50',
      moderate: '51-100',
      poor: '>100',
    },
    importance: 'Coarse dust and particles can irritate the eyes, nose, and throat. Monitoring helps prevent chronic respiratory issues in industrial or urban areas.',
    healthEffect:
      'Aggravates asthma, causes coughing and breathing difficulty. Long-term exposure linked to chronic respiratory disease.',
  },

  /* ── 3. PM2.5 sensor  (frames 51–64, right) ── */
  {
    id: 'pm25',
    startFrame: 50,
    endFrame: 63,
    position: 'right',
    accent: 'green',
    title: 'PM2.5',
    subtitle: 'Fine Particulate Matter ≤ 2.5 µm — deep-penetrating particles',
    reading: '7',
    unit: 'µg/m³',
    details: [
      '• Combustion particles, smoke, haze',
      '• Penetrates deep into lungs & bloodstream',
      '• Key indicator of air quality',
    ],
    ranges: {
      good: '0-12',
      moderate: '12-35',
      poor: '>35',
    },
    importance: 'Fine particles easily bypass the body\'s natural defenses and penetrate deep into the lungs and bloodstream. Crucial metric for long-term health.',
    healthEffect:
      'Increases risk of heart attacks, stroke, and lung cancer. Especially dangerous for children and elderly.',
  },

  /* ── 4. SO₂ sensor  (frames 65–82, left) ── */
  {
    id: 'so2',
    startFrame: 64,
    endFrame: 81,
    position: 'left',
    accent: 'red',
    title: 'SO₂ — Sulphur Dioxide',
    subtitle: 'Toxic gas from fossil fuel combustion & industrial processes',
    reading: '4.83',
    unit: 'ppb',
    details: [
      '• Produced by burning coal, oil, and smelting',
      '• Electrochemical gas sensor with high sensitivity',
      '• Major contributor to acid rain & smog',
    ],
    ranges: {
      good: '0-20',
      moderate: '21-75',
      poor: '>75',
    },
    importance: 'Corrosive gas that limits respiratory function. Monitoring is essential near power plants or industrial facilities to ensure regulatory compliance.',
    healthEffect:
      'Irritates eyes, nose, and throat. Triggers asthma attacks, shortness of breath, and worsens cardiovascular disease.',
  },

  /* ── 5. NO₂ sensor  (frames 65–82, right) ── */
  {
    id: 'no2',
    startFrame: 64,
    endFrame: 81,
    position: 'right',
    accent: 'purple',
    title: 'NO₂ — Nitrogen Dioxide',
    subtitle: 'Reddish-brown gas from vehicle exhaust & power plants',
    reading: '1',
    unit: 'ppb',
    details: [
      '• Formed from high-temperature combustion',
      '• Key precursor to ozone & particulate pollution',
      '• Electrochemical sensor for real-time detection',
    ],
    ranges: {
      good: '0-53',
      moderate: '54-100',
      poor: '>100',
    },
    importance: 'Strongly irritates airways and worsens asthma. Acts as a proxy for broader traffic-related air pollution.',
    healthEffect:
      'Inflames airways, reduces lung function, and increases susceptibility to respiratory infections. Harmful to children.',
  },

  /* ── 6. Temperature  (frames 84–101, left) ── */
  {
    id: 'temperature',
    startFrame: 83,
    endFrame: 100,
    position: 'left',
    accent: 'amber',
    title: 'Temperature',
    subtitle: 'Ambient air temperature — affects pollutant behaviour',
    reading: '31',
    unit: '°C',
    details: [
      '• High-accuracy digital thermometer',
      '• Auto-calibrated with RTC timestamp',
      '• Inversions trap pollutants at ground level',
    ],
    ranges: {
      good: '18-24',
      moderate: '25-30',
      poor: '<18 / >30',
    },
    importance: 'Affects physical comfort, equipment operating limits, and how other chemical pollutants interact and disperse in the atmosphere.',
    healthEffect:
      'Extreme temperatures worsen pollutant effects and can cause heat stroke, dehydration, or hypothermia.',
  },

  /* ── 7. Humidity  (frames 84–101, right) ── */
  {
    id: 'humidity',
    startFrame: 83,
    endFrame: 100,
    position: 'right',
    accent: 'green',
    title: 'Humidity',
    subtitle: 'Relative humidity (%RH) — moisture content in air',
    reading: '63',
    unit: '%RH',
    details: [
      '• Capacitive humidity sensor',
      '• Affects perceived temperature & comfort',
      '• Key for mold and allergen monitoring',
    ],
    ranges: {
      good: '30-50',
      moderate: '51-60',
      poor: '<30 / >60',
    },
    importance: 'Directly impacts human thermal comfort. High humidity promotes mold growth; low humidity can dry out mucous membranes.',
    healthEffect:
      'High humidity promotes mold growth and dust mites. Low humidity irritates airways and skin.',
  },

  /* ── 8. NOx sensor  (frames 102–120, left) ── */
  {
    id: 'nox',
    startFrame: 101,
    endFrame: 119,
    position: 'left',
    accent: 'purple',
    title: 'NOx — Nitrogen Oxides',
    subtitle: 'Family of reactive gases (NO + NO₂) from combustion',
    reading: '4.83',
    unit: 'ppb',
    details: [
      '• Combined NO + NO₂ measurement',
      '• Primary traffic & industrial emission marker',
      '• Contributes to smog and ground-level ozone',
    ],
    ranges: {
      good: '0-50',
      moderate: '51-100',
      poor: '>100',
    },
    importance: 'Key contributor to photochemical smog and ozone layer depletion. Vital to track near high vehicular traffic zones and heavy industry.',
    healthEffect:
      'Causes airway inflammation, reduced immunity, and trigger for asthma episodes. Linked to premature mortality.',
  },

  /* ── 9. CO sensor  (frames 102–120, right) ── */
  {
    id: 'co',
    startFrame: 101,
    endFrame: 119,
    position: 'right',
    accent: 'red',
    title: 'CO — Carbon Monoxide',
    subtitle: 'Colourless, odourless toxic gas from incomplete combustion',
    reading: '10',
    unit: 'ppm',
    details: [
      '• Binds to haemoglobin 200× stronger than oxygen',
      '• Electrochemical sensor with low-ppb detection',
      '• Silent killer — undetectable without instruments',
    ],
    ranges: {
      good: '0-4.4',
      moderate: '4.5-9',
      poor: '>9',
    },
    importance: 'Binds to human hemoglobin and starves the body of oxygen. Monitoring provides life-saving early warnings in enclosed or industrial spaces.',
    healthEffect:
      'Causes headaches, dizziness, and confusion. High exposure leads to unconsciousness, brain damage, or death.',
  },
];

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

  // Image sequence showcase for air quality monitoring solution
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

        <ImageSequenceShowcase
          totalFrames={240}
          framePrefix=""
          frameFolder="/1"
          frameExtension="png"
          overlayPanels={airQualityPanels}
        />

        {/* CTA after sequence */}
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

