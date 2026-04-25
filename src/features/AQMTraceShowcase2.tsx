import { useRef, useEffect, useState, useCallback } from 'react';

/** A single annotation line: a point on the model → text label */
interface Annotation {
    id: string;
    anchorX: number;
    anchorY: number;
    labelX: number;
    labelY: number;
    label: string;
    subLines?: string[];
    accent: string;
}

// A full scene — a group of annotations visible in a frame range of
interface Scene {
    id: string;
    startFrame: number;
    endFrame: number;
    card?: {
        title: string;
        subtitle?: string;
        tag?: string;
        bullets: string[];
        accent: string;
        accentGlow: string;
        side: 'left' | 'right';
        anchorX?: number;
        anchorY?: number;
    };
    annotations: Annotation[];
}

// Scene data
const SCENES: Scene[] = [
    /* ── LKVAR ── */
    {
        id: 'intro',
        startFrame: 1,
        endFrame: 10,
        card: {
            title: 'KVAR Air Quality Monitor',
            subtitle:
                'Our flagship environmental monitoring unit — real-time pollutant tracking with industrial-grade precision. Best-selling AQM solution for smart cities, factories, and public spaces.',
            tag: 'Best Seller',
            bullets: [
                'Monitors PM2.5, PM10, SO2, NO2, NOx, CO, Temp, Humidity & AQI',
                'Wi-Fi enabled with web dashboard',
                'Weatherproof outdoor-rated design',
                'Remote LED display connectivity',
            ],
            accent: '#64c8ff',
            accentGlow: 'rgba(100,200,255,0.2)',
            side: 'right',
            anchorX: 79,
            anchorY: 50,

        },
        annotations: [],
    },

    /* ── LCD── */
    {
        id: 'detailed-view',
        startFrame: 11,
        endFrame: 20,
        annotations: [
            {
                id: 'lcd',
                anchorX: 67,
                anchorY: 35,
                labelX: 82,
                labelY: 35,
                label: '16×2 LCD Display',
                subLines: ['Live sensor readings', 'Menu navigation', 'Status indicators'],
                accent: '#64c8ff',
            },
        ],
    },
    /* ──  RTC ── */
    {
        id: 'rtc',
        startFrame: 21,
        endFrame: 35,
        annotations: [
            {
                id: 'rtc',
                anchorX: 65,
                anchorY: 37,
                labelX: 75,
                labelY: 37,
                label: 'Built-in RTC',
                subLines: ['Accurate Date & Time stamping', 'Auto-sync capability'],
                accent: '#f59e0b',
            },
        ],
    },

    /* ── PM ── */
    {
        id: 'sensors-detail',
        startFrame: 35,
        endFrame: 55,
        annotations: [
            {
                id: 'pm-reading',
                anchorX: 42,
                anchorY: 44,
                labelX: 9,
                labelY: 44,
                label: 'PM2.5 & PM10',
                subLines: ['Laser scattering sensor', 'Real-time particulate count'],
                accent: '#ef4444',
            },
            {
                id: 'so2-no2',
                anchorX: 42,
                anchorY: 64,
                labelX: 9,
                labelY: 64,
                label: 'SO2 & NO2',
                subLines: ['Electrochemical gas sensors', 'Sulfur dioxide & Nitrogen dioxide detection'],
                accent: '#a855f7',
            },
        ],
    },

    /* ── Temp & Humidity detail  ── */
    {
        id: 'temp-humi-detail',
        startFrame: 70,
        endFrame: 85,
        annotations: [
            {
                id: 'temp-humi',
                anchorX: 50,
                anchorY: 41,
                labelX: 70,
                labelY: 41,
                label: 'Temp & Humidity',
                subLines: ['Digital precision sensor', 'Auto-calibrated readings'],
                accent: '#f59e0b',
            },
            {
                id: 'nox-co',
                anchorX: 48,
                anchorY: 65,
                labelX: 70,
                labelY: 65,
                label: 'NOx & CO',
                subLines: ['Nitrogen oxides & Carbon monoxide', 'High-sensitivity gas detection'],
                accent: '#10b981',
            },
        ],
    },

    /* ── 4. Weatherproof / Connectivity  ── */
    {
        id: 'build',
        startFrame: 130,
        endFrame: 165,
        card: {
            title: 'Rugged & Connected',
            subtitle: 'Built for continuous outdoor deployment with seamless connectivity.',
            tag: 'Build & Connectivity',
            bullets: [
                'Weatherproof polycarbonate cabinet',
                'Data download through built-in Webpage',
                'Wi-Fi connectivity to Remote Display',
                'Supply: 110–230 VAC / 50–60 Hz',
            ],
            accent: '#f59e0b',
            accentGlow: 'rgba(245,158,11,0.2)',
            side: 'left',
        },
        annotations: [
            {
                id: 'cabinet',
                anchorX: 50,
                anchorY: 30,
                labelX: 75,
                labelY: 20,
                label: 'Polycarbonate Cabinet',
                subLines: ['Weatherproof rated', 'UV resistant'],
                accent: '#f59e0b',
            },
            {
                id: 'wifi',
                anchorX: 55,
                anchorY: 55,
                labelX: 78,
                labelY: 50,
                label: 'Wi-Fi Module',
                subLines: ['Connect to remote display', 'Web dashboard access'],
                accent: '#64c8ff',
            },
        ],
    },

    /* ── 5. Remote Display spec  ── */
    {
        id: 'remote-display',
        startFrame: 180,
        endFrame: 180,
        card: {
            title: 'Remote LED Display',
            subtitle: 'Large-format RGB outdoor display for public AQI visibility.',
            tag: 'Remote Display',
            bullets: [
                'Display Type: LED Dot Matrix',
                'View: Single-sided · Color: RGB',
                'Visibility: Suitable for daylight viewing',
                'Content: Alphanumeric',
                'Screen: 768 (H) × 1152 (W) mm',
                'Size: 3 (H) × 4 (W) ft approx. · Pixel: P6',
                'Connectivity: Wi-Fi to AQI Unit',
                'Cabinet: MS powder-coated, weatherproof',
                'IP Rating: IP65 rated',
                'Power: 110–230 VAC / 50 Hz',
            ],
            accent: '#ef4444',
            accentGlow: 'rgba(239,68,68,0.2)',
            side: 'right',
        },
        annotations: [],
    },
];

const TOTAL_FRAMES = 180;
const SCROLL_HEIGHT = TOTAL_FRAMES * 8; // vh

// Tab navigation
interface Tab {
    id: string;
    label: string;
    targetFrame: number;
    frameRange: [number, number];
}

const TABS: Tab[] = [
    { id: 'overview', label: 'Overview', targetFrame: 0, frameRange: [0, 20] },
    { id: 'lcd', label: 'LCD Display', targetFrame: 15, frameRange: [7, 35] },
    { id: 'pm', label: 'PM Sensor', targetFrame: 45, frameRange: [35, 70] },
    { id: 'temp', label: 'Temp & Humidity', targetFrame: 80, frameRange: [72, 90] },
    { id: 'connectivity', label: 'Connectivity', targetFrame: 145, frameRange: [130, 165] },
];

// Hotspot zones
type ZoneType = 'display' | 'pm' | 'temp' | null;

interface Hotspot {
    zone: ZoneType;
    x: { min: number; max: number };
    y: { min: number; max: number };
    targetFrame: number;
    label: string;
}

const HOTSPOTS: Hotspot[] = [
    {
        zone: 'pm',
        x: { min: 0.33, max: 0.45 },
        y: { min: 0.30, max: 0.60 },
        targetFrame: 20,
        label: 'PM Sensor'
    },
    {
        zone: 'display',
        x: { min: 0.45, max: 0.57 },
        y: { min: 0.30, max: 0.60 },
        targetFrame: 40,
        label: 'LCD Display'
    },
    {
        zone: 'temp',
        x: { min: 0.57, max: 0.69 },
        y: { min: 0.30, max: 0.60 },
        targetFrame: 80,
        label: 'Temp Sensor'
    }
];

const ZONE_CONTENT: Record<Exclude<ZoneType, null>, { title: string; description: string; specs: string[] }> = {
    display: {
        title: '16×2 LCD Display',
        description: 'High-contrast display showing real-time sensor readings and system status.',
        specs: ['Live AQI readings', 'Menu navigation', 'Backlit for night visibility', 'Auto-dimming'],
    },
    pm: {
        title: 'PM2.5 & PM10 Sensor',
        description: 'Laser scattering technology for precise particulate matter detection.',
        specs: ['Range: 0–999 μg/m³', 'Accuracy: ±10%', 'Response time: <10s', 'Laser-based detection'],
    },
    temp: {
        title: 'Temperature & Humidity',
        description: 'Digital precision sensor for environmental monitoring.',
        specs: ['Temp: -40°C to 80°C', 'Humidity: 0–100% RH', 'Accuracy: ±0.3°C / ±2%', 'Auto-calibrated'],
    },
};

// MAIN COMPONENT
export default function AQMTraceShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const rafRef = useRef(0);

    const [loading, setLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const [activeZone, setActiveZone] = useState<ZoneType>(null);
    const animationRef = useRef<number>(0);

    // Preload frames
    useEffect(() => {
        const imgs: HTMLImageElement[] = [];
        let loaded = 0;
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `/frames/trace1/${String(i + 1).padStart(4, '0')}.webp`;
            img.onload = img.onerror = () => {
                loaded++;
                setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
                if (loaded === 30) setLoading(false); // show early
                // all 210 continue loading in background
            };

            imgs.push(img);
        }
        imagesRef.current = imgs;
    }, []);

    // Draw frame to canvas
    const drawFrame = useCallback((idx: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[idx];
        if (!canvas || !img?.complete) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Make canvas transparent instead of black
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const iw = img.naturalWidth || 1920;
        const ih = img.naturalHeight || 1080;
        const scale = Math.max(canvas.width / iw, canvas.height / ih);
        const sw = iw * scale;
        const sh = ih * scale;
        ctx.drawImage(img, (canvas.width - sw) / 2, (canvas.height - sh) / 2, sw, sh);
    }, []);

    // Smooth frame animation
    const animateToFrame = useCallback((targetFrame: number) => {
        setIsZooming(true);
        cancelAnimationFrame(animationRef.current); // cancel any ongoing animation

        const startFrame = currentFrame;
        const distance = Math.abs(targetFrame - startFrame);

        // Scale duration: min 600ms, max 2000ms based on distance
        const duration = Math.min(600 + (distance / TOTAL_FRAMES) * 1800, 2000);

        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const newFrame = Math.round(startFrame + (targetFrame - startFrame) * eased);

            setCurrentFrame(newFrame);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setCurrentFrame(targetFrame); // ensure we land exactly
                if (containerRef.current) {
                    const scrollable = containerRef.current.offsetHeight - window.innerHeight;
                    const targetScroll = (targetFrame / (TOTAL_FRAMES - 1)) * scrollable;
                    window.scrollTo({ top: targetScroll, behavior: 'instant' });
                }
                setIsZooming(false);
            }
        };

        animationRef.current = requestAnimationFrame(animate);
    }, [currentFrame]);

    // Canvas click handler
    const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        console.log("CLICKED");

        if (isZooming) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        console.log("x:", x, "y:", y);
        // Check hotspots
        for (const hotspot of HOTSPOTS) {
            if (x >= hotspot.x.min && x <= hotspot.x.max && y >= hotspot.y.min && y <= hotspot.y.max) {
                setActiveZone(hotspot.zone);
                animateToFrame(hotspot.targetFrame);
                return;
            }
        }
        // Click outside - reset
        if (activeZone) {
            setActiveZone(null);
        }
    }
        , [isZooming, activeZone, animateToFrame]);

    // Scroll → frame (disabled during zoom)
    useEffect(() => {
        if (loading || isZooming) return;
        const onScroll = () => {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const scrollable = containerRef.current.offsetHeight - window.innerHeight;
                const progress = Math.max(0, Math.min(-rect.top / scrollable, 1));
                setCurrentFrame(Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1));
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        // ← removed onScroll() call here
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafRef.current);
        };
    }, [loading, isZooming]);

    // Cleanup animation on unmount
    useEffect(() => {
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    useEffect(() => { drawFrame(currentFrame); }, [currentFrame, drawFrame]);
    useEffect(() => {
        const h = () => drawFrame(currentFrame);
        window.addEventListener('resize', h);
        return () => window.removeEventListener('resize', h);
    }, [currentFrame, drawFrame]);

    // Active scenes
    const activeScenes = SCENES.filter(
        (s) => currentFrame >= s.startFrame && currentFrame <= s.endFrame,
    );

    return (
        <div ref={containerRef} style={{ height: `${SCROLL_HEIGHT}vh`, position: 'relative', background: '#000' }}>
            {/* Sticky viewport */}
            <div style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: 'rgba(0,0,0,0.55)',
                backgroundImage: 'url(/Background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>

                {loading ? (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', color: '#fff', zIndex: 5 }}>
                        <div style={{ width: 56, height: 56, border: '3px solid rgba(100,200,255,0.15)', borderTopColor: '#64c8ff', borderRadius: '50%', animation: 'aqmSpin 0.8s linear infinite', margin: '0 auto 1.2rem' }} />
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
                            Loading experience… {loadProgress}%
                        </p>
                    </div>
                ) : (
                    <>
                        <canvas
                            ref={canvasRef}
                            onClick={handleCanvasClick}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, mixBlendMode: 'normal', cursor: isZooming ? 'wait' : 'pointer' }}
                        />


                        {/* Vignette overlay */}
                        <div style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)' }} />

                        {/* Frame counter (dev) */}
                        <div style={{
                            position: 'absolute', top: '1rem', right: '1rem', zIndex: 50,
                            background: 'rgba(0,0,0,0.7)', padding: '0.4rem 0.9rem', borderRadius: 100,
                            color: '#64c8ff', fontSize: '0.8rem', fontWeight: 700,
                            backdropFilter: 'blur(10px)', border: '1px solid rgba(100,200,255,0.2)',
                        }}>
                            Frame {currentFrame + 1} / {TOTAL_FRAMES}
                        </div>

                        {/* Scroll hint */}
                        <div style={{
                            position: 'absolute', bottom: '6rem', left: '50%', transform: 'translateX(-50%)', zIndex: 15,
                            opacity: currentFrame < 3 ? 1 : 0, transition: 'opacity 0.6s ease',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                        }}>
                            <div style={{ width: 24, height: 40, borderRadius: 12, border: '2px solid rgba(255,255,255,0.3)', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 8, borderRadius: 2, background: 'rgba(255,255,255,0.6)', animation: 'aqmBounce 1.5s ease-in-out infinite' }} />
                            </div>
                            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Scroll to explore</span>
                        </div>

                        {/* Tab Navigation Bar */}
                        <div style={{
                            position: 'fixed',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 100,
                            display: 'flex',
                            gap: '0.5rem',
                            background: 'rgba(8, 8, 12, 0.85)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(100,200,255,0.25)',
                            borderRadius: '3rem',
                            padding: '0.5rem',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(100,200,255,0.1)',
                        }}>
                            {TABS.map((tab) => {
                                const isActive = currentFrame >= tab.frameRange[0] && currentFrame <= tab.frameRange[1];
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => !isZooming && animateToFrame(tab.targetFrame)}
                                        disabled={isZooming}
                                        style={{
                                            padding: '0.6rem 1.2rem',
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            color: isActive ? '#000' : 'rgba(255,255,255,0.7)',
                                            background: isActive ? '#64c8ff' : 'transparent',
                                            border: 'none',
                                            borderRadius: '2rem',
                                            cursor: isZooming ? 'wait' : 'pointer',
                                            transition: 'all 0.3s cubic-bezier(.16,1,.3,1)',
                                            whiteSpace: 'nowrap',
                                            boxShadow: isActive ? '0 4px 16px rgba(100,200,255,0.4)' : 'none',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive && !isZooming) {
                                                e.currentTarget.style.background = 'rgba(100,200,255,0.15)';
                                                e.currentTarget.style.color = '#64c8ff';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                                            }
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Render active scenes */}
                        {activeScenes.map((scene) => {
                            const range = Math.max(scene.endFrame - scene.startFrame, 1);
                            const rawProgress = (currentFrame - scene.startFrame) / range;
                            const fadeIn = Math.min(rawProgress * 4, 1);
                            const fadeOut = currentFrame > scene.endFrame - 4 ? Math.max(1 - (currentFrame - (scene.endFrame - 4)) / 4, 0) : 1;
                            const opacity = fadeIn * fadeOut;

                            return (
                                <div key={scene.id} style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', opacity, transition: 'opacity 0.25s ease' }}>
                                    {/* Annotation lines */}
                                    {scene.annotations.map((ann, i) => (
                                        <AnnotationLine key={ann.id} annotation={ann} delay={i * 0.12} opacity={opacity} />
                                    ))}
                                    {/* Card */}
                                    {scene.card && <InfoCard card={scene.card} opacity={opacity} />}
                                </div>
                            );
                        })}

                        {/* Floating zone panel */}
                        {activeZone && (
                            <div style={{
                                position: 'fixed',
                                bottom: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '90%',
                                maxWidth: 600,
                                zIndex: 100,
                                animation: 'slideUp 0.4s cubic-bezier(.16,1,.3,1)',
                            }}>
                                <div style={{
                                    background: 'rgba(8, 8, 12, 0.92)',
                                    backdropFilter: 'blur(40px)',
                                    WebkitBackdropFilter: 'blur(40px)',
                                    border: '1.5px solid rgba(100,200,255,0.3)',
                                    borderRadius: '1.5rem 1.5rem 0 0',
                                    padding: '1.5rem 2rem 2rem',
                                    boxShadow: '0 -8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(100,200,255,0.15)',
                                    position: 'relative',
                                }}>
                                    {/* Close button */}
                                    <button
                                        onClick={() => setActiveZone(null)}
                                        style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '50%',
                                            width: 32,
                                            height: 32,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: '#fff',
                                            fontSize: '1.2rem',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                            e.currentTarget.style.transform = 'scale(1.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }}
                                    >
                                        ×
                                    </button>

                                    {/* Content */}
                                    <div style={{ paddingRight: '2rem' }}>
                                        <h3 style={{
                                            fontSize: '1.4rem',
                                            fontWeight: 800,
                                            color: '#64c8ff',
                                            margin: '0 0 0.5rem',
                                            letterSpacing: '-0.01em',
                                        }}>
                                            {ZONE_CONTENT[activeZone].title}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: 'rgba(255,255,255,0.7)',
                                            margin: '0 0 1rem',
                                            lineHeight: 1.5,
                                        }}>
                                            {ZONE_CONTENT[activeZone].description}
                                        </p>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                            gap: '0.6rem',
                                        }}>
                                            {ZONE_CONTENT[activeZone].specs.map((spec, i) => (
                                                <div key={i} style={{
                                                    background: 'rgba(100,200,255,0.08)',
                                                    border: '1px solid rgba(100,200,255,0.2)',
                                                    borderRadius: '0.5rem',
                                                    padding: '0.6rem 0.8rem',
                                                    fontSize: '0.75rem',
                                                    color: 'rgba(255,255,255,0.85)',
                                                    textAlign: 'center',
                                                }}>
                                                    {spec}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <style>{`
        @keyframes aqmSpin { to { transform: rotate(360deg); } }
        @keyframes aqmBounce {
          0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.3; transform: translateX(-50%) translateY(10px); }
        }
        @keyframes aqmDotPulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.6); opacity: 0.3; }
        }
        @keyframes aqmGlowPulse {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateX(-50%) scale(1.08); }
        }
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(100%); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        .aqm-dot-grid {
          background-image: radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 28px 28px, 80px 80px, 80px 80px;
        }
      `}</style>
        </div>
    );
}

// ANNOTATION LINE
function AnnotationLine({ annotation: a, delay, opacity }: { annotation: Annotation; delay: number; opacity: number }) {
    const lineRef = useRef<SVGPathElement>(null);
    const [drawn, setDrawn] = useState(false);

    // Animate the line drawing on mount
    useEffect(() => {
        const el = lineRef.current;
        if (!el) return;
        const len = el.getTotalLength();
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;

        const timer = setTimeout(() => {
            el.style.transition = `stroke-dashoffset 0.8s cubic-bezier(.16,1,.3,1)`;
            el.style.strokeDashoffset = '0';
            setDrawn(true);
        }, delay * 1000);

        return () => clearTimeout(timer);
    }, [delay]);

    // Build a straight line path
    const ax = a.anchorX;
    const ay = a.anchorY;
    const lx = a.labelX;
    const ly = a.labelY;

    const pathD = `M ${ax} ${ay} L ${lx} ${ly}`;

    return (
        <>
            {/* SVG line */}
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 11,
                    pointerEvents: 'none', overflow: 'visible',
                }}
            >
                {/* Glow version of line */}
                <path
                    d={pathD}
                    fill="none"
                    stroke={a.accent}
                    strokeWidth="0.25"
                    strokeOpacity={opacity * 0.3}
                    style={{ filter: 'blur(1px)' }}
                />
                {/* Main line */}
                <path
                    ref={lineRef}
                    d={pathD}
                    fill="none"
                    stroke={a.accent}
                    strokeWidth="0.2"
                    strokeOpacity={opacity * 0.8}
                />
                {/* Anchor dot */}
                <circle
                    cx={ax}
                    cy={ay}
                    r="0.5"
                    fill={a.accent}
                    style={{ opacity: opacity * 0.9 }}
                />
                {/* Pulsing ring */}
                <circle
                    cx={ax}
                    cy={ay}
                    r="0.8"
                    fill="none"
                    stroke={a.accent}
                    strokeWidth="0.1"
                    style={{ opacity: opacity * 0.5, animation: 'aqmDotPulse 2s ease-in-out infinite', transformOrigin: `${ax}% ${ay}%` }}
                />
            </svg>

            {/* Text label */}
            <div
                style={{
                    position: 'absolute',
                    left: `${lx}%`,
                    top: `${ly}%`,
                    transform: 'translateY(-50%)',
                    zIndex: 12,
                    opacity: drawn ? opacity : 0,
                    transition: 'opacity 0.5s ease',
                    maxWidth: '25vw',
                    pointerEvents: 'none',
                    background: 'rgba(8, 8, 12, 0.82)',
                    backdropFilter: 'blur(20px)',
                    border: `1.5px solid ${a.accent}44`,
                    borderRadius: '1rem',
                    padding: '1rem 1.25rem',
                    boxShadow: `0 0 30px ${a.accent}22`,
                }}
            >
                {/* Label title */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem',
                }}>
                    <div style={{
                        width: 12, height: 2, background: a.accent, borderRadius: 1,
                        boxShadow: `0 0 8px ${a.accent}`,
                    }} />
                    <span style={{
                        fontSize: '1rem', fontWeight: 800, color: '#fff',
                        letterSpacing: '0.04em', textTransform: 'uppercase',
                        textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                    }}>
                        {a.label}
                    </span>
                </div>

                {/* Sub-lines */}
                {a.subLines && a.subLines.map((line, i) => (
                    <div
                        key={i}
                        style={{
                            fontSize: '0.85rem',
                            color: 'rgba(255,255,255,0.6)',
                            paddingLeft: '1rem',
                            lineHeight: 1.6,
                            textShadow: '0 1px 8px rgba(0,0,0,0.9)',
                        }}
                    >
                        • {line}
                    </div>
                ))}
            </div>
        </>
    );
}

// INFO CARD (glassmorphism)
// For bigger spec-sheet-style information
function InfoCard({
    card,
    opacity,
}: {
    card: NonNullable<Scene['card']>;
    opacity: number;
}) {
    const isRight = card.side === 'right';

    return (
        <>
            {/* Optional Pointer Line to Card */}
            {card.anchorX !== undefined && card.anchorY !== undefined && (
                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 11,
                        pointerEvents: 'none', overflow: 'visible',
                    }}
                >
                    <path
                        d={`M ${card.anchorX} ${card.anchorY} L ${isRight ? 62 : 38} 50`}
                        fill="none"
                        stroke={card.accent}
                        strokeWidth="0.15"
                        strokeOpacity={opacity * 0.7}
                        style={{
                            strokeDasharray: 600,
                            strokeDashoffset: opacity > 0.5 ? 0 : 600,
                            transition: 'stroke-dashoffset 0.8s ease, stroke-opacity 0.8s ease',
                        }}
                    />
                    <circle
                        cx={card.anchorX}
                        cy={card.anchorY}
                        r="0.6"
                        fill={card.accent}
                        style={{ opacity: opacity * 0.9 }}
                    />
                </svg>
            )}

            {/* Glassmorphism Card */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    ...(isRight ? { right: '3vw' } : { left: '3vw' }),
                    transform: `translateY(-50%) translateY(${opacity < 0.5 ? 16 : 0}px)`,
                    maxWidth: 'min(380px, 28vw)',
                    width: 'auto',
                    zIndex: 12,
                    pointerEvents: opacity > 0.3 ? 'auto' : 'none',
                    opacity,
                    transition: 'opacity 0.5s cubic-bezier(.16,1,.3,1), transform 0.5s cubic-bezier(.16,1,.3,1)',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        background: 'rgba(8, 8, 12, 0.82)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: `1.5px solid ${card.accent}33`,
                        borderRadius: '1.5rem',
                        padding: '1.5rem 2rem',
                        boxShadow: `0 0 60px ${card.accentGlow}, 0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)`,
                        overflow: 'hidden',
                    }}
                >
                    {/* Top accent line */}
                    <div style={{
                        position: 'absolute', top: 0, left: '2rem', right: '2rem', height: 2,
                        background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                        opacity: 0.8, borderRadius: 2,
                    }} />

                    {/* Corner glow */}
                    <div style={{
                        position: 'absolute', top: -50, ...(isRight ? { right: -50 } : { left: -50 }),
                        width: 160, height: 160, borderRadius: '50%',
                        background: card.accentGlow, filter: 'blur(50px)', pointerEvents: 'none',
                    }} />

                    {/* Tag */}
                    {card.tag && (
                        <div style={{
                            display: 'inline-block', fontSize: '0.55rem', fontWeight: 800,
                            letterSpacing: '0.16em', textTransform: 'uppercase', color: card.accent,
                            background: `${card.accent}12`, border: `1px solid ${card.accent}30`,
                            borderRadius: 100, padding: '0.2rem 0.7rem', marginBottom: '0.6rem',
                        }}>
                            {card.tag}
                        </div>
                    )}

                    {/* Title */}
                    <h3 style={{
                        fontSize: '1.2rem', fontWeight: 800, color: '#fff',
                        margin: '0 0 0.3rem', lineHeight: 1.25, letterSpacing: '-0.01em',
                    }}>
                        {card.title}
                    </h3>

                    {/* Subtitle */}
                    {card.subtitle && (
                        <p style={{
                            fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)',
                            margin: '0 0 0.8rem', lineHeight: 1.55,
                        }}>
                            {card.subtitle}
                        </p>
                    )}

                    {/* Bullets */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {card.bullets.map((b, i) => (
                            <li key={i} style={{
                                display: 'flex', alignItems: 'flex-start', gap: '0.55rem', padding: '0.4rem 0',
                                borderBottom: i < card.bullets.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            }}>
                                <span style={{
                                    flexShrink: 0, width: 5, height: 5, borderRadius: '50%',
                                    background: card.accent, marginTop: '0.42rem',
                                    boxShadow: `0 0 6px ${card.accent}`,
                                }} />
                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.55 }}>
                                    {b}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
