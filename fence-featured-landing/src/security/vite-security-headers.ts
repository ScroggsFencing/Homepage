import { Plugin } from 'vite';
import { securityHeaders } from './headers';

export function securityHeadersPlugin(): Plugin {
  return {
    name: 'security-headers',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Apply security headers
        Object.entries(securityHeaders).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
        next();
      });
    },
  };
} 