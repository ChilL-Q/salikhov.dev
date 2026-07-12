import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = React.HTMLAttributes<HTMLDivElement>;

const vertexShader = `
    varying vec3 vColor;
    void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 24.0 * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `
    uniform sampler2D pointTexture;
    uniform float uViewportHeight;
    varying vec3 vColor;
    void main() {
        vec4 texColor = texture2D(pointTexture, gl_PointCoord);
        float screenY = gl_FragCoord.y / uViewportHeight;
        float fadeBottom = smoothstep(0.0, 0.2, screenY);
        float fadeTop = 1.0 - smoothstep(0.85, 1.0, screenY);
        float alpha = fadeBottom * fadeTop * texColor.a;
        gl_FragColor = vec4(vColor, alpha);
    }
`;

export function DottedSurface({ ...props }: DottedSurfaceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!containerRef.current || isInitialized.current) return;
        isInitialized.current = true;

        const container = containerRef.current;
        const SEPARATION = 150;
        const AMOUNTX = 40;
        const AMOUNTY = 80;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            10000,
        );
        camera.position.set(0, 355, 1220);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        container.appendChild(renderer.domElement);

        const positions: number[] = [];
        const colors: number[] = [];

        const geometry = new THREE.BufferGeometry();

        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                const y = 0;
                const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
                positions.push(x, y, z);
                colors.push(0.96, 0.62, 0.04);
            }
        }

        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3),
        );
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d')!;
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: { value: texture },
                uViewportHeight: { value: window.innerHeight * window.devicePixelRatio },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        let count = 0;
        let animationId: number;
        let isRunning = true;

        const animate = () => {
            if (!isRunning) return;
            animationId = requestAnimationFrame(animate);

            const positionAttribute = geometry.attributes.position;
            const posArray = positionAttribute.array as Float32Array;

            let i = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    const index = i * 3;
                    posArray[index + 1] =
                        Math.sin((ix + count) * 0.3) * 50 +
                        Math.sin((iy + count) * 0.5) * 50;
                    i++;
                }
            }

            positionAttribute.needsUpdate = true;
            renderer.render(scene, camera);
            count += 0.03;
        };

        let lastWidth = window.innerWidth;
        let maxHeight = window.innerHeight;

        const handleResize = () => {
            // On mobile browsers, scrolling shows/hides the address bar,
            // shrinking and growing innerHeight repeatedly. Only grow the
            // canvas to the tallest height seen (address bar hidden) and
            // never shrink it back down, so the animation keeps filling the
            // full screen without jumping while scrolling.
            const widthChanged = window.innerWidth !== lastWidth;
            const grew = window.innerHeight > maxHeight;
            if (!widthChanged && !grew) return;

            lastWidth = window.innerWidth;
            maxHeight = Math.max(maxHeight, window.innerHeight);

            camera.aspect = window.innerWidth / maxHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, maxHeight);
            material.uniforms.uViewportHeight.value = maxHeight * window.devicePixelRatio;
        };

        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            isRunning = false;
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            isInitialized.current = false;

            scene.traverse((object) => {
                if (object instanceof THREE.Points) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach((m) => m.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
            renderer.dispose();

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
            {...props}
        />
    );
}