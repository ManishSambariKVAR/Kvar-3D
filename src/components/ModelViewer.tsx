import {
    ContactShadows,
    Environment,
    OrbitControls,
    useGLTF,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef, Component } from 'react';
import type { ReactNode } from 'react';
import * as THREE from 'three';

/* ── Error Boundary ── */
class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode; fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

/* ── Loading spinner shown while model loads ── */
function LoadingFallback() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
    );
}

/* ── Rotating model ── */
function Model({ path, speed = 0.15 }: { path: string; speed?: number }) {
    const { scene } = useGLTF(path);
    const group = useRef<THREE.Group>(null);

    const { centeredScene, scale } = useMemo(() => {
        // `useGLTF` caches scenes. Never mutate the cached object (React StrictMode renders twice in dev).
        const cloned = scene.clone(true);
        const box = new THREE.Box3().setFromObject(cloned);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        cloned.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const nextScale = maxDim > 0 ? 6 / maxDim : 1;
        return { centeredScene: cloned, scale: nextScale };
    }, [scene]);

    useFrame(({ clock }) => {
        if (group.current) {
            group.current.rotation.y = clock.elapsedTime * speed;
            group.current.position.y = Math.sin(clock.elapsedTime) * 0.1; // 👈 floating
        }
    });

    return (
        <group ref={group} scale={scale} position={[0, -1, 0]}>
            <primitive object={centeredScene} />
        </group>
    );
}

/* ── Studio Lights ── */
function StudioLights() {
    return (
        <>
            {/* Soft ambient */}
            <ambientLight intensity={0.4} />

            {/* Main key light */}
            <directionalLight
                position={[3, 5, 5]}
                intensity={2}
                color="#ffffff"
            />

            {/* Blue rim light (tech vibe) */}
            <directionalLight
                position={[-5, 2, -5]}
                intensity={1.2}
                color="#3b82f6"
            />

            {/* Bottom glow */}
            <pointLight
                position={[0, -2, 2]}
                intensity={2}
                color="#22d3ee"
            />
        </>
    );
}

interface ModelViewerProps {
    modelPath: string;
    className?: string;
    autoRotateSpeed?: number;
    showHint?: boolean;
    bgColor?: string;
    enableZoom?: boolean;
    cameraPosition?: [number, number, number];
}

export default function ModelViewer({
    modelPath,
    className = '',
    autoRotateSpeed = 0.6,
    showHint = false,
    bgColor,
    enableZoom = true,
    cameraPosition = [0, 0.5, 4],
}: ModelViewerProps) {
    return (
        <div className={`relative ${className}`}>
            <ErrorBoundary fallback={
                <div className="flex flex-col items-center justify-center w-full h-full text-muted/50 text-sm gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Model Unavailable</span>
                </div>
            }>
                <Suspense fallback={<LoadingFallback />}>
                    <Canvas
                        camera={{ fov: 45, position: cameraPosition }}
                        dpr={[1, 1.5]}
                        shadows
                        style={{ background: bgColor || 'transparent' }}
                    >

                        <StudioLights />
                        <Model path={modelPath} speed={autoRotateSpeed * 0.25} />
                        <Environment preset="city" />
                        <ContactShadows
                            blur={3}
                            far={6}
                            opacity={0.4}
                            position={[0, -1.6, 0]}
                            scale={10}
                        />
                        <OrbitControls
                            autoRotate
                            autoRotateSpeed={autoRotateSpeed}
                            enablePan={false}
                            enableZoom={enableZoom}
                            minDistance={2}
                            maxDistance={10}
                        />
                    </Canvas>
                </Suspense>
            </ErrorBoundary>

            {showHint && (
                <span
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5
                     text-xs text-muted bg-surface/60 backdrop-blur-md
                     border border-border rounded-full px-3.5 py-1.5
                     select-none pointer-events-none"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
                        <path d="M8 12h8M12 8v8" />
                    </svg>
                    Drag to rotate · Scroll to zoom
                </span>
            )}
        </div>
    );
}
