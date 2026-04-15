# Railway Deployment Guide

## Prerequisites

- Railway account (https://railway.app)
- GitHub repository connected to Railway
- Environment variables configured

## Deployment Steps

### 1. Connect GitHub Repository

1. Go to [Railway Dashboard](https://railway.app)
2. Click "New Project"
3. Select "GitHub Repo"
4. Authorize Railway with GitHub
5. Select `sinan722007-cell/Meta-reklam-panel` repository

### 2. Configure Build & Deploy Settings

Railway will automatically:
- Detect Node.js project
- Run `npm install`
- Run `npm run build` (builds frontend + backend)
- Run `npm start` (starts backend with frontend static files)

**Build Command:** Uses default `build` script from package.json
**Start Command:** Uses `Procfile` (`npm start`)

### 3. Set Environment Variables

Add these to Railway project:

**Backend (.env)**
```
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-railway-app.up.railway.app

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Meta API
META_API_VERSION=v18.0
META_ACCESS_TOKEN=your_token_here
META_BUSINESS_ACCOUNT_ID=your_account_id

# JWT
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_EXPIRE=7d

# Other configs...
```

### 4. Add PostgreSQL (Optional)

If using Railway's PostgreSQL:
1. Add "PostgreSQL" plugin from Railway marketplace
2. Copy `DATABASE_URL` from PostgreSQL service
3. Paste into backend environment variables

### 5. Deploy

1. Commit and push changes
2. Railway auto-deploys on push to main
3. Monitor deployment from Railway dashboard

## What Happens During Deployment

```bash
# Step 1: Install dependencies
npm install
  ├── Backend dependencies
  └── Frontend dependencies

# Step 2: Build (from package.json scripts)
npm run build
  ├── npm run build:frontend → Creates static files
  └── npm run build:backend → Compiles TypeScript to dist/

# Step 3: Start (from Procfile)
npm start
  └── cd backend && npm start → Runs backend server
      └── Serves frontend static files from dist/
```

## Directory Structure After Build

```
backend/
├── dist/            # Compiled backend
├── public/          # Frontend static files (dist/ copied here)
├── src/
├── dist/index.js    # Backend entry point
└── package.json
```

## Troubleshooting

### Error: `tsc: not found`
- ✅ **FIXED**: TypeScript moved to dependencies (not devDependencies)

### Error: `npm ERR! code EJSONPARSE`
- Check package.json syntax
- Ensure all quotes are properly escaped

### Build timeout
- Increase Railway build timeout in settings
- Check if dependencies are too large

### Port not accessible
- Ensure `PORT` environment variable is set
- Backend uses port 5000, Railway maps to public URL

### Database connection fails
- Verify `DATABASE_URL` is correct
- Create databases if using external PostgreSQL
- Check firewall rules

## Performance Tips

1. **Add .railwayignore** to exclude unnecessary files
   ```
   node_modules/
   .git/
   .env.local
   docs/
   ```

2. **Use production build**
   - `NODE_ENV=production` in environment variables

3. **Enable caching**
   - Railway automatically caches `node_modules/`

## Monitoring

1. View logs in Railway dashboard
2. Check build logs for compilation errors
3. View runtime logs for server errors

## Redeploy

To redeploy without code changes:
1. Go to Railway dashboard
2. Select deployment
3. Click "Redeploy"

Or push an empty commit:
```bash
git commit --allow-empty -m "Redeploy"
git push origin main
```

## Custom Domain

1. In Railway project settings
2. Add custom domain
3. Configure DNS records as shown in Railway

---

**Status**: Ready for production deployment ✅
