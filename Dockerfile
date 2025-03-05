FROM node:18-alpine AS builder

WORKDIR /app

# Accept build argument
ARG ApiClients_IdentityServiceUri
ARG ApiClients_ApiGatewayUri
ARG Portals_Main
ARG Portals_Admin
# Set the environment variable for Vite to pick up
ENV VITE_AUTH_BASE_URL=$ApiClients_IdentityServiceUri
ENV VITE_API_GATEWAY_BASE_URL=$ApiClients_ApiGatewayUri
ENV VITE_MAIN_PORTAL_URL=$Portals_Main
ENV VITE_ADMIN_PORTAL_URL=$Portals_Admin

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files including TypeScript configs
COPY . .

# Set a default value for NODE_ENV; you can override this during build with --build-arg NODE_ENV=development
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN if [ "$NODE_ENV" = "development" ]; then \
      npm run build -- --sourcemap; \
    else \
      npm run build; \
    fi

FROM nginx:alpine

# Copy built files to Nginx's default directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]