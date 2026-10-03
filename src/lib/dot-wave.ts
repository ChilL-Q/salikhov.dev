/**
 * The hero's dotted wave: a 40×80 grid of points rippling under a perspective camera.
 * Plain WebGL — the wave is computed in the vertex shader, so a frame is one uniform
 * update and one draw call. Loaded lazily (see DottedSurface) and never on the critical path.
 */

const AMOUNT_X = 40;
const AMOUNT_Y = 80;
const SEPARATION = 150;
const CAMERA_Y = 355;
const CAMERA_Z = 1220;
const FOV = 60;
const NEAR = 1;
const FAR = 10000;
/** wave phase advanced per second, independent of the display's refresh rate */
const PHASE_PER_SECOND = 0.9;

const f = (n: number) => n.toFixed(1);

const VERTEX = `
attribute vec2 aGrid;
uniform mat4 uProjection;
uniform float uPhase;
void main() {
    float x = aGrid.x * ${f(SEPARATION)} - ${f(((AMOUNT_X - 1) * SEPARATION) / 2)};
    float z = aGrid.y * ${f(SEPARATION)} - ${f(((AMOUNT_Y - 1) * SEPARATION) / 2)};
    float y = sin((aGrid.x + uPhase) * 0.3) * 36.0 + sin((aGrid.y + uPhase) * 0.5) * 36.0;
    vec4 view = vec4(x, y - ${f(CAMERA_Y)}, z - ${f(CAMERA_Z)}, 1.0);
    gl_PointSize = 24.0 * (300.0 / -view.z);
    gl_Position = uProjection * view;
}`;

const FRAGMENT = `
precision mediump float;
uniform vec3 uColor;
uniform float uViewportHeight;
void main() {
    // soft round sprite: full at the centre, 0.8 at half radius, 0 at the edge
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float alpha = d < 0.5 ? mix(1.0, 0.8, d * 2.0) : mix(0.8, 0.0, clamp(d * 2.0 - 1.0, 0.0, 1.0));
    // fade out towards the bottom and top of the screen
    float y = gl_FragCoord.y / uViewportHeight;
    alpha *= smoothstep(0.0, 0.2, y) * (1.0 - smoothstep(0.85, 1.0, y));
    gl_FragColor = vec4(uColor, alpha);
}`;

function perspective(fovDeg: number, aspect: number, near: number, far: number): Float32Array {
    const t = 1 / Math.tan((fovDeg * Math.PI) / 360);
    const nf = 1 / (near - far);
    // column-major
    return new Float32Array([t / aspect, 0, 0, 0, 0, t, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

/** Dot colour: a quiet warm grey from the palette (--dot-rgb in index.css). */
function dotColor(): [number, number, number] {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--dot-rgb');
    const rgb = raw.trim().split(/\s+/).map(Number);
    return rgb.length === 3 && rgb.every(Number.isFinite) ? [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255] : [1, 1, 1];
}

/**
 * Mobile browsers grow window.innerHeight as the address bar hides. Sizing to 100lvh
 * upfront (and only ever growing) keeps the canvas from jumping while scrolling.
 */
function largeViewportHeight(): number {
    const probe = document.createElement('div');
    probe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100lvh;visibility:hidden;pointer-events:none';
    document.body.appendChild(probe);
    const height = probe.getBoundingClientRect().height;
    probe.remove();
    return height || window.innerHeight;
}

/** Mounts the wave into `container`; returns a cleanup function. */
export function startDotWave(container: HTMLElement): () => void {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return () => {};

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return () => {};
    gl.useProgram(program);

    const grid = new Float32Array(AMOUNT_X * AMOUNT_Y * 2);
    let i = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
            grid[i++] = ix;
            grid[i++] = iy;
        }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, grid, gl.STATIC_DRAW);
    const aGrid = gl.getAttribLocation(program, 'aGrid');
    gl.enableVertexAttribArray(aGrid);
    gl.vertexAttribPointer(aGrid, 2, gl.FLOAT, false, 0, 0);

    const uProjection = gl.getUniformLocation(program, 'uProjection');
    const uPhase = gl.getUniformLocation(program, 'uPhase');
    const uViewportHeight = gl.getUniformLocation(program, 'uViewportHeight');
    gl.uniform3fv(gl.getUniformLocation(program, 'uColor'), dotColor());

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // additive, like overlapping light
    gl.clearColor(0, 0, 0, 0);

    // documentElement.clientWidth excludes the scrollbar, so the grid stays centred with the content
    const viewportWidth = () => document.documentElement.clientWidth || window.innerWidth;
    let width = 0;
    let height = 0;
    const resize = (w: number, h: number) => {
        width = w;
        height = h;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniformMatrix4fv(uProjection, false, perspective(FOV, w / h, NEAR, FAR));
        gl.uniform1f(uViewportHeight, canvas.height);
    };
    resize(viewportWidth(), largeViewportHeight());

    canvas.style.cssText += ';position:absolute;top:0;left:0;opacity:0;transition:opacity 1.2s ease';
    container.appendChild(canvas);

    let phase = 0;
    const draw = () => {
        gl.uniform1f(uPhase, phase);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, AMOUNT_X * AMOUNT_Y);
    };

    let frame = 0;
    let running = false;
    let last = 0;
    const tick = (now: number) => {
        phase += (PHASE_PER_SECOND * (now - last)) / 1000;
        last = now;
        draw();
        frame = requestAnimationFrame(tick);
    };
    const play = () => {
        if (running) return;
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(tick);
    };
    const pause = () => {
        running = false;
        cancelAnimationFrame(frame);
    };

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    draw();
    requestAnimationFrame(() => (canvas.style.opacity = '1'));

    // only animate while the hero is on screen
    const visibility = new IntersectionObserver(([entry]) => {
        if (still) return;
        if (entry.isIntersecting) play();
        else pause();
    });
    visibility.observe(container);

    const onResize = () => {
        const w = viewportWidth();
        const grew = window.innerHeight > height;
        if (w === width && !grew) return;
        resize(w, Math.max(height, window.innerHeight));
        if (!running) draw();
    };
    window.addEventListener('resize', onResize);

    return () => {
        pause();
        visibility.disconnect();
        window.removeEventListener('resize', onResize);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        canvas.remove();
    };
}
