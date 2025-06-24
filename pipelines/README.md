# KinoDev UI Azure Deployment

This folder contains all the necessary files for deploying the KinoDev UI application to Azure using Azure DevOps Pipelines.

## Files Included

- **azure-pipeline.yml**: The main pipeline definition file that handles build, artifact publishing, and deployment.
- **web.config**: Configuration file for IIS on Azure App Service to handle SPA routing and set security headers.
- **inject-env.ps1**: PowerShell script to inject environment variables at runtime, allowing for dynamic configuration.

## Pipeline Overview

The pipeline consists of two main stages:

1. **Build Stage**
   - Sets up Node.js
   - Installs dependencies
   - Runs linting
   - Runs tests
   - Builds the application
   - Injects runtime environment configurations
   - Publishes the artifact

2. **Deploy Stage**
   - Downloads the build artifact
   - Deploys to Azure Web App

## Required Environment Variables

The following pipeline variables must be set in your Azure DevOps project:

- **AZURE_SERVICE_CONNECTION**: The name of the service connection to Azure
- **AZURE_WEBAPP_NAME**: The name of your Azure Web App

### Application Environment Variables

These variables are used during the build and injected into the application:

- **VITE_AUTH_BASE_URL**: Authentication service base URL
- **VITE_API_GATEWAY_BASE_URL**: API Gateway base URL
- **VITE_MAIN_PORTAL_URL**: Main portal URL
- **VITE_ADMIN_PORTAL_URL**: Admin portal URL
- **VITE_PUBLIC_IMAGES_HOST**: Public images host
- **VITE_PUBLIC_IMAGES_STORE_ACCOUNT**: Public images store account

## Setting Up the Pipeline

1. In Azure DevOps, go to Pipelines and create a new pipeline
2. Choose "Azure Repos Git" as the source
3. Select your repository
4. Choose "Existing Azure Pipelines YAML file"
5. Select `/pipelines/azure-pipeline.yml` from the dropdown
6. Click "Continue"
7. Review the pipeline and click "Run"

## Setting Pipeline Variables

Before running the pipeline, make sure to set all required variables:

1. In Azure DevOps, go to Pipelines > Edit > Variables
2. Add all the required variables mentioned above
3. Mark any sensitive variables as "Secret"

## Pre-requisites

- Azure DevOps account with appropriate permissions
- Azure subscription
- Azure Web App created and configured
- Service connection set up in Azure DevOps

## Runtime Environment Variables

The application is designed to use environment variables injected at runtime through the `env-config.js` file, which gets created during the build process. This allows for changing environment settings without rebuilding the application.
