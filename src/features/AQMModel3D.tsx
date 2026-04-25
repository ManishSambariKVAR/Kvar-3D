import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Hotspot from '../three/Hotspot';
import CameraController from '../three/CameraController';
import InfoPanel from '../three/InfoPanel';
import { hotspotConfig } from '../config/hotspotConfig';
import type { HotspotData } from '../config/hotspotConfig';

function AnimatedModel({ isPaused }: { isPaused: boolean }) {
    const { scene, animations } = useGLTF('/trace_ani_opt.glb');
    const mixer = useRef<THREE.AnimationMixer | null>(null);

    useEffect(() => {
        if (!scene) return;
        const box = new THREE.Box3().setFromObject(scene);
        console.log('center:', box.getCenter(new THREE.Vector3()));
        console.log('size:', box.getSize(new THREE.Vector3()));
        console.log('min:', box.min);
        console.log('max:', box.max);
    }, [scene]);

    // Uncomment when ready to re-enable animation
    // useEffect(() => {
    //     if (animations.length === 0 || !scene) return;
    //     const nextMixer = new THREE.AnimationMixer(scene);
    //     mixer.current = nextMixer;
    //     animations.forEach((clip) => nextMixer.clipAction(clip).play());
    //     return () => { nextMixer.stopAllAction(); };
    // }, [scene, animations]);

    useFrame((_, delta) => {
        if (!isPaused) mixer.current?.update(delta);
    });

    return <primitive object={scene} />;
}

export default function AQMModel3D() {
    const [isPaused, setIsPaused] = useState(false);
    const [targetCameraPos, setTargetCameraPos] = useState<[number, number, number] | null>(null);
    const [targetLookAt, setTargetLookAt] = useState<[number, number, number] | null>(null);
    const [orbitEnabled, setOrbitEnabled] = useState(true);
    const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);
    const orbitRef = useRef<any>(null);

    const handleHotspotClick = (id: string, position: [number, number, number]) => {
        const hotspot = hotspotConfig.find(h => h.id === id);
        if (!hotspot) return;
        setIsPaused(true);
        setOrbitEnabled(false);
        setTargetCameraPos(hotspot.cameraPosition);
        setTargetLookAt(hotspot.cameraLookAt);
        setActiveHotspot(hotspot);
    };

    const handleReset = () => {
        setTargetCameraPos([0, 0.5, 4]);
        setTargetLookAt([0, 0, 0]);
        setActiveHotspot(null);
        setTimeout(() => {
            setOrbitEnabled(true);
            setIsPaused(false);
        }, 1500);
    };

    const handleAnimationComplete = () => {
        if (!activeHotspot) {
            setOrbitEnabled(true);
            setIsPaused(false);
        }
    };

    return (
        <div style={{ width: '100%', height: '100vh', background: '#000', position: 'relative' }}>
            <InfoPanel
                isVisible={!!activeHotspot}
                title={activeHotspot?.title || ''}
                description={activeHotspot?.description || ''}
                onClose={handleReset}
            />
            <Canvas camera={{ position: [0, 0.5, 4], fov: 45 }} shadows>
                <Suspense fallback={null}>
                    <ambientLight intensity={3} />
                    <directionalLight position={[0, 5, 5]} intensity={4} />
                    <directionalLight position={[5, 3, 5]} intensity={3} />
                    <directionalLight position={[-5, 3, 5]} intensity={3} />

                    <group position={[0.5, -0.5, 0]} scale={1.5} rotation={[Math.PI / 2, -Math.PI / 2, Math.PI / 2]}>
                        <AnimatedModel isPaused={isPaused} />
                        {hotspotConfig.map((hotspot) => (
                            <Hotspot
                                key={hotspot.id}
                                id={hotspot.id}
                                position={hotspot.position}
                                size={hotspot.size}
                                onHotspotClick={handleHotspotClick}
                            />
                        ))}
                    </group>

                    <CameraController
                        targetPosition={targetCameraPos}
                        targetLookAt={targetLookAt}
                        onComplete={handleAnimationComplete}
                    />
                    <Environment preset="city" />
                    <OrbitControls
                        ref={orbitRef}
                        enabled={orbitEnabled}
                        enablePan={false}
                        minDistance={3}
                        maxDistance={10}
                        onStart={() => setIsPaused(true)}
                        onEnd={() => setIsPaused(false)}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload('/trace_ani_opt.glb');