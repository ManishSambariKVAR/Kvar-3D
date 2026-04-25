import { useRef } from 'react';
import * as THREE from 'three';

interface HotspotProps {
    position: [number, number, number];
    size?: [number, number, number];
    id: string;
    onHotspotClick: (id: string, position: [number, number, number]) => void;
}

export default function Hotspot({ position, size = [0.3, 0.3, 0.3], id, onHotspotClick }: HotspotProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    return (
        <mesh
            ref={meshRef}
            position={position}
            onClick={(e) => {
                e.stopPropagation();
                onHotspotClick(id, position);
            }}
        >
            <boxGeometry args={size} />
            <meshBasicMaterial transparent opacity={0.4}
                color="red" />
        </mesh>
    );
}
