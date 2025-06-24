# PowerShell script to replace environment variables in the built index.html file

# Define the output file
$INDEX_HTML_FILE = ".\dist\index.html"

# Check if file exists
if (-not (Test-Path $INDEX_HTML_FILE)) {
    Write-Error "Error: $INDEX_HTML_FILE not found!"
    exit 1
}

# Create a config script that will be injected
$envConfig = @"
window.ENV = {
  VITE_AUTH_BASE_URL: "$env:VITE_AUTH_BASE_URL",
  VITE_API_GATEWAY_BASE_URL: "$env:VITE_API_GATEWAY_BASE_URL",
  VITE_MAIN_PORTAL_URL: "$env:VITE_MAIN_PORTAL_URL",
  VITE_ADMIN_PORTAL_URL: "$env:VITE_ADMIN_PORTAL_URL",
  VITE_PUBLIC_IMAGES_HOST: "$env:VITE_PUBLIC_IMAGES_HOST",
  VITE_PUBLIC_IMAGES_STORE_ACCOUNT: "$env:VITE_PUBLIC_IMAGES_STORE_ACCOUNT"
};
"@

# Write the config to a file
Set-Content -Path ".\dist\env-config.js" -Value $envConfig

# Inject the config script reference into the HTML file
$content = Get-Content -Path $INDEX_HTML_FILE -Raw
$content = $content -replace '</head>', "  <script src=`"/env-config.js`"></script>`n</head>"
Set-Content -Path $INDEX_HTML_FILE -Value $content

Write-Output "Environment variables have been injected into the build"
