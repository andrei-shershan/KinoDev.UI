#!/bin/bash

# Script to replace environment variables in the built index.html file

# Define the output file
INDEX_HTML_FILE="./dist/index.html"

# Check if file exists
if [ ! -f "$INDEX_HTML_FILE" ]; then
    echo "Error: $INDEX_HTML_FILE not found!"
    exit 1
fi

# Create a config script that will be injected
cat > ./dist/env-config.js << EOF
window.ENV = {
  VITE_AUTH_BASE_URL: "${VITE_AUTH_BASE_URL}",
  VITE_API_GATEWAY_BASE_URL: "${VITE_API_GATEWAY_BASE_URL}",
  VITE_MAIN_PORTAL_URL: "${VITE_MAIN_PORTAL_URL}",
  VITE_ADMIN_PORTAL_URL: "${VITE_ADMIN_PORTAL_URL}",
  VITE_PUBLIC_IMAGES_HOST: "${VITE_PUBLIC_IMAGES_HOST}",
  VITE_PUBLIC_IMAGES_STORE_ACCOUNT: "${VITE_PUBLIC_IMAGES_STORE_ACCOUNT}"
};
EOF

# Inject the config script reference into the HTML file
sed -i 's|</head>|  <script src="/env-config.js"></script>\n</head>|' "$INDEX_HTML_FILE"

echo "Environment variables have been injected into the build"
