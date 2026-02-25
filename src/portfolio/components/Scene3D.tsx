import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../../hooks/useIsMobile';

// Particle Sphere Component
const ParticleSphere = ({ count = 3000, radius = 5, color = '#4fa8ff', size = 0.02, speed = 0.1, opacity = 0.8 }: { count?: number, radius?: number, color?: string, size?: number, speed?: number, opacity?: number }) => {

    // Generate random points on sphere surface
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            // Spherical distribution
            // Using a simple random distribution in a cube then normalizing to sphere is easier/uniform enough for this look
            const x = (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 2;
            const z = (Math.random() - 0.5) * 2;

            const vector = new THREE.Vector3(x, y, z).normalize().multiplyScalar(radius);
            temp.push(vector.x, vector.y, vector.z);
        }
        return new Float32Array(temp);
    }, [count, radius]);

    const ref = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            // Constant rotation
            ref.current.rotation.y += delta * speed * 0.5;
            ref.current.rotation.z += delta * speed * 0.2;

            // "Breathing" scale effect
            const time = state.clock.elapsedTime;
            const scale = 1 + Math.sin(time * 0.5) * 0.05; // Gentle pulse
            ref.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                color={color}
                transparent
                opacity={opacity}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const InteractiveScene = () => {
    const groupRef = useRef<THREE.Group>(null);
    const isMobile = useIsMobile();

    // Mouse interaction removed as per user request.
    // The scene remains static/auto-animated via Float and ParticleSphere internal rotation.

    return (
        <group ref={groupRef} scale={isMobile ? 0.95 : 1}>
            {/* Core - Dense & Bright */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <ParticleSphere
                    count={isMobile ? 600 : 1200}
                    radius={4}
                    color="#60a5fa"
                    size={0.03}
                    speed={0.15}
                    opacity={0.8}
                />
            </Float>

            {/* Middle Layer - Sparser & Larger */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
                <ParticleSphere
                    count={isMobile ? 250 : 500}
                    radius={6}
                    color="#a5f3fc"
                    size={0.05}
                    speed={-0.1}
                    opacity={0.5}
                />
            </Float>

            {/* Outer Layer - Dust/Atmosphere */}
            <Float speed={0.5} rotationIntensity={0.1} floatIntensity={1}>
                <ParticleSphere
                    count={isMobile ? 150 : 300}
                    radius={9}
                    color="#e0f2fe"
                    size={0.08}
                    speed={0.05}
                    opacity={0.3}
                />
            </Float>
        </group>
    );
};

export const Scene3D = () => {
    const isMobile = useIsMobile();

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none' // Ensures background doesn't block interactions
        }}>
            <Canvas
                camera={{ position: [0, 0, isMobile ? 30 : 16], fov: 45 }}
                dpr={[1, 1.5]} // Strict limit on DPR to prevent lag on Retina/4K displays
                gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }} // alpha: false helps performance if bg is solid
                performance={{ min: 0.5 }} // Dynamic quality scaling
            >
                <color attach="background" args={['#050811']} />

                {/* Reduced Stars count for performance */}
                <Stars radius={300} depth={50} count={isMobile ? 1500 : 3000} factor={4} saturation={0} fade speed={1} />

                <InteractiveScene />
            </Canvas>
        </div>
    );
};
