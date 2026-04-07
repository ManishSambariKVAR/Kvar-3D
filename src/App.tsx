import { ContactShadows, OrbitControls, Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const satelliteColors = ['#7dd3fc', '#c084fc', '#fda4af', '#fde68a'];

function SceneLights() {
  const cyanLight = useRef<THREE.PointLight>(null);
  const pinkLight = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (cyanLight.current) {
      cyanLight.current.position.set(
        Math.cos(t) * 4.8,
        Math.sin(t * 1.4) * 1.6 + 1.8,
        Math.sin(t) * 4.2,
      );
    }

    if (pinkLight.current) {
      pinkLight.current.position.set(
        Math.cos(t * 0.7 + Math.PI) * 4.5,
        Math.cos(t * 1.1) * 1.4 - 1,
        Math.sin(t * 0.9 + Math.PI / 2) * 4.8,
      );
    }
  });

  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 8, 18]} />
      <ambientLight intensity={0.55} />
      <hemisphereLight color="#dbeafe" groundColor="#020617" intensity={0.8} />
      <directionalLight
        castShadow
        color="#fff7ed"
        intensity={1.1}
        position={[4, 6, 2]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <pointLight
        ref={cyanLight}
        castShadow
        color="#22d3ee"
        decay={2}
        distance={20}
        intensity={30}
      />
      <pointLight
        ref={pinkLight}
        castShadow
        color="#fb7185"
        decay={2}
        distance={18}
        intensity={24}
      />
    </>
  );
}

function OrbitalCore() {
  const core = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const orbiters = useRef<THREE.Group>(null);
  const outerShell = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (core.current) {
      core.current.rotation.x = Math.sin(t * 0.55) * 0.25;
      core.current.rotation.y = t * 0.55;
      core.current.position.y = Math.sin(t * 1.5) * 0.25;
    }

    if (ring.current) {
      ring.current.rotation.z = t * 0.9;
      ring.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.04);
    }

    if (orbiters.current) {
      orbiters.current.rotation.z = t * 0.35;
      orbiters.current.rotation.x = Math.cos(t * 0.6) * 0.3;
    }

    if (outerShell.current) {
      outerShell.current.rotation.y = t * -0.15;
      outerShell.current.rotation.x = Math.sin(t * 0.2) * 0.5;
    }
  });

  return (
    <>
      <group ref={core}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#fb923c"
            emissiveIntensity={0.7}
            metalness={0.45}
            roughness={0.2}
          />
        </mesh>

        <mesh ref={ring} castShadow rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.95, 0.09, 24, 160]} />
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>
      </group>

      <group ref={orbiters}>
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index / 12) * Math.PI * 2;
          const radius = index % 2 === 0 ? 3.3 : 2.7;
          const color = satelliteColors[index % satelliteColors.length];

          return (
            <mesh
              key={index}
              castShadow
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius * 0.65,
                Math.sin(angle * 2) * 1.1,
              ]}
            >
              <sphereGeometry args={[index % 3 === 0 ? 0.16 : 0.11, 24, 24]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.1}
                metalness={0.45}
                roughness={0.25}
              />
            </mesh>
          );
        })}
      </group>

      <mesh ref={outerShell}>
        <icosahedronGeometry args={[4.5, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </>
  );
}

function App() {
  return (
    <div className="scene-shell">
      <Canvas camera={{ fov: 50, position: [0, 0.6, 7.5] }} dpr={[1, 2]} shadows>
        <SceneLights />
        <OrbitalCore />
        <Sparkles color="#93c5fd" count={90} scale={9} size={2.2} speed={0.35} />

        <mesh position={[0, -2.2, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[7, 64]} />
          <meshStandardMaterial color="#08111f" metalness={0.1} roughness={0.95} />
        </mesh>

        <ContactShadows
          blur={2.8}
          far={5}
          opacity={0.45}
          position={[0, -2.18, 0]}
          scale={8}
        />

        <OrbitControls enablePan={false} maxDistance={10} minDistance={5.5} />
      </Canvas>

      <div className="scene-copy">
        <p>KVAR 3D</p>
        <h1>Animated Orbital Core</h1>
        <span>Drag the scene to look around.</span>
      </div>
    </div>
  );
}

export default App;
