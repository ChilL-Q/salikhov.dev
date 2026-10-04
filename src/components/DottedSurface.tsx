import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = React.HTMLAttributes<HTMLDivElement>;

const vertexShader = `
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 24.0 * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `
    uniform sampler2D pointTexture;
    uniform float uViewportHeight;
    uniform vec3 uColor;
    void main() {
        vec4 texColor = texture2D(pointTexture, gl_PointCoord);
        float screenY = gl_FragCoord.y / uViewportHeight;
        float fadeBottom = smoothstep(0.0, 0.2, screenY);
        float fadeTop = 1.0 - smoothstep(0.85, 1.0, screenY);
        float alpha = fadeBottom * fadeTop * texColor.a;
        gl_FragColor = vec4(uColor, alpha);
    }
`;

// Sized once against `100lvh` (the viewport with browser UI collapsed), so the canvas covers the hero from
// the first frame. Its height also sets the camera's aspect, so resizing it re-projects the whole wave.
function getMaxViewportHeight(): number {
    if (typeof document === 'undefined') return window.innerHeight;
    const probe = document.createElement('div');
    probe.style.cssText = 'position:fixed;top:0;left:0;height:100lvh;width:0;visibility:hidden;pointer-events:none;';
    document.body.appendChild(probe);
    const height = probe.getBoundingClientRect().height;
    document.body.removeChild(probe);
    return height || window.innerHeight;
}

// Dots take their colour from the site palette: the main orange (--accent-rgb in index.css)
function getDotColor(): THREE.Color {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb');
    const [r, g, b] = raw.trim().split(/\s+/).map(Number);
    if ([r, g, b].some(Number.isNaN)) return new THREE.Color(1, 1, 1);
    return new THREE.Color(r / 255, g / 255, b / 255);
}

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

        const initialHeight = getMaxViewportHeight();
        // documentElement.clientWidth excludes the scrollbar, unlike
        // window.innerWidth — page content centers within it, so the canvas
        // must match or the dot grid renders slightly off-center.
        const getViewportWidth = () => document.documentElement.clientWidth || window.innerWidth;
        const initialWidth = getViewportWidth();

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            60,
            initialWidth / initialHeight,
            1,
            10000,
        );
        camera.position.set(0, 355, 1220);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(initialWidth, initialHeight);
        renderer.setClearColor(0x000000, 0);

        container.appendChild(renderer.domElement);

        const positions: number[] = [];

        const geometry = new THREE.BufferGeometry();

        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const x = ix * SEPARATION - ((AMOUNTX - 1) * SEPARATION) / 2;
                const y = 0;
                const z = iy * SEPARATION - ((AMOUNTY - 1) * SEPARATION) / 2;
                positions.push(x, y, z);
            }
        }

        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3),
        );

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
                uViewportHeight: { value: initialHeight * window.devicePixelRatio },
                uColor: { value: getDotColor() },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Advance by elapsed time rather than a fixed amount per frame, so
        // the animation runs at the same speed regardless of the display's
        // refresh rate / actual FPS (e.g. a 60Hz phone vs a 120Hz laptop).
        const COUNT_PER_SECOND = 1.8;
        let count = 0;
        let lastTime = performance.now();
        let animationId: number;
        let isRunning = true;
        // with reduced motion the wave is drawn once, standing still
        const stillOnly = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const animate = () => {
            if (!isRunning) return;
            if (!stillOnly) animationId = requestAnimationFrame(animate);

            const now = performance.now();
            const delta = (now - lastTime) / 1000;
            lastTime = now;

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
            count += COUNT_PER_SECOND * delta;
        };

        let lastWidth = initialWidth;
        let lastHeight = initialHeight;
        // Phones and in-app browsers (Safari, Telegram) change only the viewport's height while scrolling, as
        // their toolbars collapse. Resizing the canvas then changes the camera's aspect and the whole wave jumps,
        // so on touch screens a height-only change is ignored; the canvas follows a real resize (rotation, or a
        // desktop window being resized).
        const touchScreen = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

        const handleResize = () => {
            const width = getViewportWidth();
            const height = getMaxViewportHeight();
            if (width === lastWidth && (touchScreen || height === lastHeight)) return;

            lastWidth = width;
            lastHeight = height;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            material.uniforms.uViewportHeight.value = height * window.devicePixelRatio;
            if (stillOnly) renderer.render(scene, camera);
        };

        // Don't burn GPU/battery re-rendering the dots once the hero is
        // scrolled out of view — pause the loop and resume when it's back.
        const visibilityObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isRunning) {
                isRunning = true;
                lastTime = performance.now();
                animate();
            } else if (!entry.isIntersecting && isRunning) {
                isRunning = false;
                cancelAnimationFrame(animationId);
            }
        });
        visibilityObserver.observe(container);

        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            isRunning = false;
            cancelAnimationFrame(animationId);
            visibilityObserver.disconnect();
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