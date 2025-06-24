# KinoDev UI - Production Deployment

## Deployment Configuration

The project is configured for optimal production deployment with the following features:

### Build Optimizations
- Code splitting for better performance
- Minification and tree-shaking using Terser
- Asset compression with Gzip and Brotli
- No source maps in production to reduce bundle size
- Console logs removed in production
- Environment-specific variables

### Web Server Configuration (web.config)
- URL rewriting for SPA client-side routing
- Static file caching (1-year max age)
- Security headers (CSP, HSTS, etc.)
- MIME type configuration for all asset types
- HTTP compression enabled

## Deployment Process

The Azure DevOps pipeline automatically:
1. Installs dependencies with `npm ci` (clean install)
2. Builds the application in production mode
3. Copies web.config to the distribution folder
4. Creates a robots.txt file
5. Deploys to Azure Web App

## Manual Deployment

If you need to deploy manually:

```bash
# Install dependencies
npm ci

# Build for production
npm run build -- --mode production

# Copy web.config to dist folder
cp web.config dist/

# Create robots.txt
echo "User-agent: *\nDisallow: /admin\nAllow: /" > dist/robots.txt
```

## Environment Variables

Production environment variables are stored in `.env.production`. Update this file if you need to change API endpoints or other configuration for production.

## Post-Deployment Verification

After deployment, verify:
1. The site loads correctly
2. Client-side routing works (including after page refreshes)
3. Assets are properly compressed (check network tab in DevTools)
4. Security headers are correctly set
5. No console errors appear
