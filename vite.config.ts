import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    build: {
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
            'vendor-framer': ['framer-motion'],
            'vendor-lucide': ['lucide-react']
          }
        }
      }
    },
    server: {
      proxy: {
        '/fal-api': {
          target: 'https://fal.run', // default/fallback to sync endpoint
          changeOrigin: true,
          secure: true,
          configure: (proxy, _options) => {
            proxy.on('error', (_err, _req, _res) => {
              // console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req: any, _res) => {
              const targetUrl = req.headers['x-fal-target-url'];
              const key = env.VITE_FAL_KEY;

              // Log crucial details
              // console.log(`[Proxy] ${req.method} ${req.url}`);
              // if (targetUrl) console.log(`  -> Target URL: ${targetUrl}`);
              // if (key) console.log(`  -> Key present: ${key.substring(0, 8)}...`);

              // Set Auth
              proxyReq.setHeader('Authorization', `Key ${key}`);

              if (targetUrl) {
                try {
                  const parsed = new URL(targetUrl);
                  // Ensure Host header matches target
                  proxyReq.setHeader('Host', parsed.host);
                  // We MUST manually set the path here if we are routing dynamically
                  // BUT 'rewrite' option in config runs BEFORE this event? 
                  // No, 'rewrite' runs to determine target? 
                  // Let's set the path explicitly to be safe.
                  proxyReq.path = parsed.pathname + parsed.search;
                  // console.log(`  -> Upstream: ${parsed.protocol}//${parsed.host}${proxyReq.path}`);
                } catch (e) {
                  console.error('Failed to parse target url', e);
                }
              }
            });
            proxy.on('proxyRes', (proxyRes, req: any, _res) => {
              console.log(`[Proxy] Response: ${proxyRes.statusCode} ${req.url}`);
            });
          },
          // Dynamic router based on x-fal-target-url header
          router: (req: any) => {
            const url = req.headers['x-fal-target-url'];
            if (typeof url === 'string') {
              try {
                const parsed = new URL(url);
                return `${parsed.protocol}//${parsed.host}`;
              } catch (e) {
                console.error('Router parse error', e);
              }
            }
            return 'https://fal.run'; // Default fallback
          },
        },
      },
    },
  }
})
