import { Canvas, useFrame,  } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState} from 'react';
import * as THREE from 'three';

function AnimatedModel({ isPaused }: { isPaused: boolean }) {
    const { scene, animations } = useGLTF('/trace_ani_opt.glb');
    const mixer = useRef<THREE.AnimationMixer | null>(null);

    useEffect(() => {
        if (animations.length === 0 || !scene) return;
        const nextMixer = new THREE.AnimationMixer(scene);
        mixer.current = nextMixer;
        animations.forEach((clip) => nextMixer.clipAction(clip).play());
        return () => { nextMixer.stopAllAction(); };
    }, [scene, animations]);

    useFrame((_, delta) => {
        if (!isPaused) mixer.current?.update(delta);
    });

    return (
        <group>
            <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
        </group>
    );
}

export default function AQMModel3D() {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div style={{ width: '100%', height: '100vh', background: '#000' }}>
            <Canvas camera={{ position: [0, 1, 6], fov: 45 }} shadows>
                <Suspense fallback={null}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
                    <directionalLight position={[-5, 5, -5]} intensity={2} />
                    <directionalLight position={[0, 5, 0]} intensity={2} />
                    <AnimatedModel isPaused={isPaused} />
                    <Environment preset="city" />
                    <OrbitControls
                        enablePan={false}
                        minDistance={3}
                        maxDistance={10}
                        onStart={() => setIsPaused(true)}   // pause on interact
                        onEnd={() => setIsPaused(false)}    // resume after
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload('/trace_ani_opt.glb');
