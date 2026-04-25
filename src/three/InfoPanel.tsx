import { motion, AnimatePresence } from 'framer-motion';

interface InfoPanelProps {
    isVisible: boolean;
    title: string;
    description: string;
    onClose: () => void;
}

export default function InfoPanel({ isVisible, title, description, onClose }: InfoPanelProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        maxWidth: '300px',
                        zIndex: 1000,
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{title}</h3>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '24px',
                                cursor: 'pointer',
                                padding: 0,
                                lineHeight: 1,
                            }}
                        >
                            ×
                        </button>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, opacity: 0.9 }}>
                        {description}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
