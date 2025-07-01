FROM node:18-alpine AS builder

WORKDIR /app

# Accept build argument
ARG ApiClients_IdentityServiceUri
ARG ApiClients_ApiGatewayUri
ARG Portals_Main
ARG Portals_Admin
ARG Public_Images_Host
ARG Public_Images_Store_Account
ARG Public_Tickets_Store_Account

# Set the environment variable for Vite to pick up
ENV VITE_AUTH_BASE_URL=$ApiClients_IdentityServiceUri
ENV VITE_API_GATEWAY_BASE_URL=$ApiClients_ApiGatewayUri
ENV VITE_MAIN_PORTAL_URL=$Portals_Main
ENV VITE_ADMIN_PORTAL_URL=$Portals_Admin
ENV VITE_PUBLIC_IMAGES_HOST=$Public_Images_Host
ENV VITE_PUBLIC_IMAGES_STORE_ACCOUNT=$Public_Images_Store_Account
ENV VITE_PUBLIC_TICKETS_STORE_ACCOUNT=$Public_Tickets_Store_Account

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
      npm run build:docker -- --sourcemap; \
    else \
      npm run build:docker; \
    fi

FROM nginx:alpine

# Copy built files to Nginx's default directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]