import { type CSSProperties } from 'react';

/* ── Types ── */
export interface SensorPanelData {
    id: string;
    startFrame: number;
    endFrame: number;
    position: 'left' | 'right' | 'center' | 'bottom-left' | 'bottom-right';
    accent?: 'green' | 'amber' | 'cyan' | 'red' | 'purple';
    title: string;
    subtitle?: string;
    details: string[];
    reading?: string;
    unit?: string;
    healthEffect?: string;
    isSpecSheet?: boolean;
    importance?: string;
    ranges?: {
        good?: string;
        moderate?: string;
        poor?: string;
    };
}

/* ── Accent palette tokens ── */
const ACCENTS: Record<string, { border: string; glow: string; text: string; dot: string; bg: string }> = {
    green: {
        border: 'rgba(34,197,94,0.4)',
        glow: 'rgba(34,197,94,0.18)',
        text: '#22c55e',
        dot: '#22c55e',
        bg: 'rgba(34,197,94,0.06)',
    },
    amber: {
        border: 'rgba(245,158,11,0.4)',
        glow: 'rgba(245,158,11,0.18)',
        text: '#f59e0b',
        dot: '#f59e0b',
        bg: 'rgba(245,158,11,0.06)',
    },
    cyan: {
        border: 'rgba(100,200,255,0.4)',
        glow: 'rgba(100,200,255,0.18)',
        text: '#64c8ff',
        dot: '#64c8ff',
        bg: 'rgba(100,200,255,0.06)',
    },
    red: {
        border: 'rgba(239,68,68,0.4)',
        glow: 'rgba(239,68,68,0.18)',
        text: '#ef4444',
        dot: '#ef4444',
        bg: 'rgba(239,68,68,0.06)',
    },
    purple: {
        border: 'rgba(168,85,247,0.4)',
        glow: 'rgba(168,85,247,0.18)',
        text: '#a855f7',
        dot: '#a855f7',
        bg: 'rgba(168,85,247,0.06)',
    },
};

/* ── Position presets (bigger panels sit comfortably) ── */
const POSITIONS: Record<string, CSSProperties> = {
    left: { top: '50%', left: '3vw', transform: 'translateY(-50%)' },
    right: { top: '50%', right: '3vw', transform: 'translateY(-50%)' },
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    'bottom-left': { bottom: '5rem', left: '3vw' },
    'bottom-right': { bottom: '5rem', right: '3vw' },
};

/* ── Component ── */
interface Props {
    panel: SensorPanelData;
    visible: boolean;
}

export default function SensorOverlayPanel({ panel, visible }: Props) {
    const accent = ACCENTS[panel.accent ?? 'green'];
    const pos = POSITIONS[panel.position] ?? POSITIONS.right;

    return (
        <div
            style={{
                position: 'absolute',
                ...pos,
                zIndex: 20,
                // Make spec sheet much larger to accommodate the model details nicely
                maxWidth: panel.isSpecSheet ? 560 : 460,
                width: '94vw',
                pointerEvents: visible ? 'auto' : 'none',
                opacity: visible ? 1 : 0,
                transform: `${pos.transform ?? ''} translateY(${visible ? '0px' : '24px'})`.trim(),
                transition: 'opacity 0.65s cubic-bezier(.16,1,.3,1), transform 0.65s cubic-bezier(.16,1,.3,1)',
            }}
        >
            {/* Glass card */}
            <div
                style={{
                    position: 'relative',
                    background: 'rgba(8, 8, 12, 0.75)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: `1.5px solid ${accent.border}`,
                    borderRadius: '1.75rem',
                    padding: '2.5rem',
                    boxShadow: `
            0 0 80px ${accent.glow},
            0 16px 48px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Accent top-line glow */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '2rem',
                        right: '2rem',
                        height: 3,
                        background: `linear-gradient(90deg, transparent, ${accent.text}, transparent)`,
                        opacity: 0.9,
                        borderRadius: 3,
                    }}
                />

                {/* Ambient corner glow */}
                <div
                    style={{
                        position: 'absolute',
                        top: -60,
                        right: -60,
                        width: 180,
                        height: 180,
                        borderRadius: '50%',
                        background: accent.glow,
                        filter: 'blur(60px)',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />

                {/* Top Section (Fixed) */}
                <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        {/* LED dot */}
                        <span
                            style={{
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                background: accent.dot,
                                boxShadow: `0 0 16px ${accent.dot}, 0 0 6px ${accent.dot}`,
                                animation: 'sensorPulse 2s ease-in-out infinite',
                            }}
                        />
                        <span
                            style={{
                                fontSize: '1.05rem',
                                fontWeight: 800,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: accent.text,
                            }}
                        >
                            {panel.title}
                        </span>
                    </div>

                    {/* Subtitle */}
                    {panel.subtitle && (
                        <p
                            style={{
                                fontSize: '1.15rem',
                                color: 'rgba(255,255,255,0.7)',
                                margin: '0 0 1.25rem',
                                lineHeight: 1.5,
                                fontWeight: 400,
                            }}
                        >
                            {panel.subtitle}
                        </p>
                    )}

                    {/* Reading — BIG */}
                    {panel.reading && (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', margin: '0.5rem 0 1.25rem' }}>
                            <span
                                style={{
                                    fontSize: '4.5rem',
                                    fontWeight: 800,
                                    color: '#fff',
                                    fontFamily: "'Inter', system-ui, sans-serif",
                                    letterSpacing: '-0.04em',
                                    lineHeight: 1,
                                    textShadow: `0 0 40px ${accent.glow}`,
                                }}
                            >
                                {panel.reading}
                            </span>
                            {panel.unit && (
                                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: accent.text }}>{panel.unit}</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Bottom Section (Scrollable if needed) */}
                <div
                    className="custom-scrollbar"
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        maxHeight: panel.isSpecSheet ? 440 : 400,
                        overflowY: 'auto',
                        paddingRight: '0.75rem',
                        marginRight: '-0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem', // nice spacing between content blocks
                    }}
                >
                    {/* Details list */}
                    {panel.details.length > 0 && (
                        <ul
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            {panel.details.map((line, i) => {
                                const isIndented = line.startsWith('• ') || line.startsWith('○ ');
                                const isSub = line.startsWith('○ ');
                                const isHeader = !isIndented && !isSub;
                                return (
                                    <li
                                        key={i}
                                        style={{
                                            fontSize: isSub ? '0.95rem' : isHeader ? '1.1rem' : '1.05rem',
                                            fontWeight: isHeader ? 700 : 400,
                                            color: isHeader
                                                ? accent.text
                                                : isSub
                                                    ? 'rgba(255,255,255,0.45)'
                                                    : 'rgba(255,255,255,0.85)',
                                            padding: isHeader ? '0.65rem 0 0.35rem' : '0.35rem 0',
                                            paddingLeft: isSub ? '1.4rem' : isIndented ? '0.8rem' : 0,
                                            lineHeight: 1.6,
                                            borderBottom: isHeader ? `1px solid ${accent.border}` : 'none',
                                        }}
                                    >
                                        {line}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {/* Ranges Block */}
                    {panel.ranges && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                            gap: '0.6rem',
                        }}>
                            {panel.ranges.good && (
                                <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>Good</div>
                                    <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>{panel.ranges.good}</div>
                                </div>
                            )}
                            {panel.ranges.moderate && (
                                <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>Moderate</div>
                                    <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>{panel.ranges.moderate}</div>
                                </div>
                            )}
                            {panel.ranges.poor && (
                                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>Poor</div>
                                    <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>{panel.ranges.poor}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Importance Block */}
                    {panel.importance && (
                        <div style={{
                            padding: '1rem 1.25rem',
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: '1rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255,255,255,0.95)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em', display: 'block' }}>
                                Why it Matters
                            </span>
                            <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                                {panel.importance}
                            </div>
                        </div>
                    )}

                    {/* Health effect */}
                    {panel.healthEffect && (
                        <div
                            style={{
                                padding: '1rem 1.25rem',
                                background: accent.bg,
                                borderRadius: '1rem',
                                border: `1px solid ${accent.border}`,
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '0.85rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: accent.text,
                                    display: 'block',
                                    marginBottom: '0.4rem',
                                }}
                            >
                                Health Impact
                            </span>
                            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
                                {panel.healthEffect}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {/* Custom scrollbar styles injected per-component for scoped simplicity */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.2);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.15);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.3);
                }
            `}</style>
        </div>
    );
}
