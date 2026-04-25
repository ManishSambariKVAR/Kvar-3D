import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface CameraControllerProps {
    targetPosition: [number, number, number] | null;
    targetLookAt: [number, number, number] | null;
    onComplete?: () => void;
    duration?: number;
}

export default function CameraController({
    targetPosition,
    targetLookAt,
    onComplete,
    duration = 1.5
}: CameraControllerProps) {
    const { camera } = useThree();
    const startPos = useRef(new THREE.Vector3());
    const startLookAt = useRef(new THREE.Vector3(0, 0, 0));
    const progress = useRef(0);
    const isAnimating = useRef(false);

    useEffect(() => {
        if (targetPosition && targetLookAt) {
            startPos.current.copy(camera.position);
            startLookAt.current.set(0, 0, 0); // but not ideal            progress.current = 0;
            isAnimating.current = true;
        }
    }, [targetPosition, targetLookAt, camera]);

    useFrame((_, delta) => {
        if (!isAnimating.current || !targetPosition || !targetLookAt) return;

        progress.current += delta / duration;

        if (progress.current >= 1) {
            camera.position.set(...targetPosition);
            camera.lookAt(...targetLookAt);
            isAnimating.current = false;
            onComplete?.();
            return;
        }

        // Smooth easing (ease-in-out)
        const t = progress.current < 0.5
            ? 2 * progress.current * progress.current
            : 1 - Math.pow(-2 * progress.current + 2, 2) / 2;

        camera.position.lerpVectors(startPos.current, new THREE.Vector3(...targetPosition), t);

        const currentLookAt = new THREE.Vector3().lerpVectors(
            startLookAt.current,
            new THREE.Vector3(...targetLookAt),
            t
        );
        camera.lookAt(currentLookAt);
    });

    return null;
}
