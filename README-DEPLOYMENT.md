# Railway Deployment Guide

This guide explains how to deploy the SnowScout application to Railway.

## Architecture

The application is deployed as **two separate Railway services** from the same monorepo:

1. **Backend Service** - FastAPI application (Python)
2. **Frontend Service** - Vite React application (Node.js)

## Prerequisites

- Railway account connected to your GitHub repository
- Repository pushed to GitHub with all the configuration files

## Deployment Steps

### 1. Create Backend Service

1. In Railway dashboard, click **"New Project"** → **"Deploy from GitHub repo"**
2. Select your `snowscout` repository
3. Configure the service:
   - **Service Name**: `snowscout-backend`
   - **Root Directory**: `backend`
   - Railway will auto-detect the Python app and use the `Procfile`

4. Set environment variables (if needed):
   - `ALLOWED_ORIGINS` - Add your frontend Railway URL once deployed (e.g., `https://snowscout-frontend.railway.app`)
   - For now, you can leave this empty and update it after deploying the frontend

5. Deploy the service
6. **Copy the backend URL** from Railway (e.g., `https://snowscout-backend.railway.app`)

### 2. Create Frontend Service

1. In the same Railway project, click **"New Service"** → **"GitHub Repo"**
2. Select the same `snowscout` repository
3. Configure the service:
   - **Service Name**: `snowscout-frontend`
   - **Root Directory**: `frontend`
   - Railway will auto-detect the Node.js app

4. **Set environment variables** (CRITICAL):
   - `VITE_API_URL` = Your backend URL from step 1 (e.g., `https://snowscout-backend.railway.app`)

5. Configure build settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

6. Deploy the service

### 3. Update Backend CORS Settings

1. Go back to the **backend service** settings
2. Add/update the environment variable:
   - `ALLOWED_ORIGINS` = Your frontend URL (e.g., `https://snowscout-frontend.railway.app`)
3. Redeploy the backend service

## Environment Variables Reference

### Backend Service
| Variable | Description | Example |
|----------|-------------|---------|
| `ALLOWED_ORIGINS` | Comma-separated list of allowed frontend origins | `https://snowscout-frontend.railway.app,http://localhost:5173` |
| `PORT` | Port to run the server (auto-set by Railway) | `8000` |

### Frontend Service
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | `https://snowscout-backend.railway.app` | ✅ Yes |

## Local Development

To test the production configuration locally:

1. **Backend**:
   ```bash
   cd backend
   # Create .env file (optional)
   echo "ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000" > .env
   uvicorn main:app --reload
   ```

2. **Frontend**:
   ```bash
   cd frontend
   # Create .env file
   echo "VITE_API_URL=http://localhost:8000" > .env
   npm install
   npm run dev
   ```

## Troubleshooting

### CORS Errors
**Symptom**: Browser console shows CORS errors when making API requests

**Solution**:
1. Verify `ALLOWED_ORIGINS` on backend includes your frontend URL
2. Ensure the frontend URL doesn't have a trailing slash
3. Redeploy the backend after updating environment variables

### API Connection Failed
**Symptom**: Frontend shows "Search failed" or connection errors

**Solution**:
1. Verify `VITE_API_URL` is set correctly on the frontend service
2. Check that the backend service is running (check Railway logs)
3. Ensure the backend URL doesn't have a trailing slash
4. Rebuild the frontend (environment variables are baked into the build)

### Build Failures

**Backend**:
- Check that `requirements.txt` is present in the `backend` directory
- Verify Python version compatibility (Railway uses Python 3.11 by default)
- Check Railway build logs for specific errors

**Frontend**:
- Ensure `package.json` is present in the `frontend` directory
- Verify `serve` is listed in dependencies
- Check that build command completes successfully
- Review Railway build logs

### Service Won't Start

**Backend**:
- Verify the `Procfile` is in the `backend` directory
- Check that the command references the correct module: `main:app`
- Review Railway deployment logs

**Frontend**:
- Ensure the build completed successfully
- Verify `dist` directory was created during build
- Check that `serve` package is installed
- Review Railway deployment logs

## Monitoring

- **Railway Logs**: Check service logs in Railway dashboard for errors
- **Metrics**: Monitor CPU, memory, and network usage in Railway dashboard
- **Health Checks**: Test the following endpoints:
  - Backend: `https://your-backend.railway.app/` (should return welcome message)
  - Frontend: `https://your-frontend.railway.app/` (should load the app)

## Updating the Application

1. Push changes to your GitHub repository
2. Railway will automatically detect changes and redeploy
3. If you added new environment variables, update them in Railway settings before deploying

## Cost Optimization

- Railway offers a free tier with limited resources
- Both services will consume resources from your Railway plan
- Consider using Railway's sleep feature for non-production environments
- Monitor usage in the Railway dashboard

## Support

If you encounter issues:
1. Check Railway's [documentation](https://docs.railway.app/)
2. Review the [Railway community forum](https://help.railway.app/)
3. Check this project's GitHub issues
