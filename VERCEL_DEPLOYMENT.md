# 🚀 Deploying to Vercel - Fix Guide

## Why You're Getting a 404 Error

The 404 error happens because:
1. **Vercel doesn't know how to build Expo web apps** by default
2. **The build output directory** needs to be specified (Expo exports to `dist`, not `web-build`)
3. **Routing configuration** is needed for single-page apps

## ✅ Solution: I've Added Configuration

I've created a `vercel.json` file that tells Vercel:
- How to build your app (`npx expo export -p web`)
- Where to find the built files (`web-build` directory)
- How to handle routing (redirect all routes to `index.html`)

## 📋 Steps to Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if you haven't already)
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Build Settings**
   - Vercel should auto-detect the `vercel.json` file
   - If not, manually set:
     - **Framework Preset**: Other
     - **Build Command**: `npm run vercel-build` (or `npx expo export -p web`)
     - **Output Directory**: `dist` (Expo exports to `dist` by default)
     - **Install Command**: `npm install`

4. **Deploy!**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose your project settings
   - Deploy!

4. **For production**
   ```bash
   vercel --prod
   ```

## 🔧 What I Changed

### 1. Added `vercel.json`
This file tells Vercel:
- How to build your Expo web app
- Where the output files are
- How to handle routing

### 2. Updated `package.json`
Added build scripts:
```json
"build": "expo export -p web",
"build:web": "expo export -p web"
```

## 🐛 Troubleshooting

### Still Getting 404?

1. **Check Build Logs**
   - Go to Vercel dashboard → Your project → Deployments
   - Click on the latest deployment
   - Check the build logs for errors

2. **Verify Build Output**
   - The build should create a `dist` folder
   - It should contain `index.html` and other assets
   - Check: `ls dist/` should show `index.html` and `_expo` folder

3. **Check Vercel Settings**
   - Go to Settings → General
   - Verify:
     - Build Command: `npm run vercel-build` (or `npx expo export -p web`)
     - Output Directory: `dist`
     - Install Command: `npm install`

4. **Clear Cache and Redeploy**
   - In Vercel dashboard → Settings → General
   - Click "Clear Build Cache"
   - Redeploy

### Build Fails?

**Error: "expo: command not found"**
- Make sure `expo` is in your `package.json` dependencies (it is!)
- Vercel should install it automatically

**Error: "Cannot find module"**
- Make sure all dependencies are in `package.json`
- Check that `node_modules` isn't in `.gitignore` incorrectly

**Error: "Build output not found"**
- Check that `dist` directory is being created (Expo exports to `dist` by default)
- Verify the build command is correct
- Make sure `outputDirectory` in `vercel.json` is set to `dist`

### App Loads But Shows Blank Page?

1. **Check Browser Console**
   - Open DevTools (F12)
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **Verify Assets**
   - Make sure images/assets are being loaded
   - Check if paths are correct

3. **Check React Native Web Compatibility**
   - Some React Native components don't work on web
   - Check console for warnings

## 📝 Alternative: Use Expo Hosting

If Vercel continues to have issues, consider using Expo's own hosting:

```bash
# Install Expo CLI
npm install -g expo-cli

# Build for web
npx expo export -p web

# Publish (if using Expo hosting)
npx expo publish
```

## ✅ After Successful Deployment

Your app will be available at:
- `https://your-project-name.vercel.app`
- Or your custom domain if configured

## 🎯 Quick Checklist

- [x] `vercel.json` created
- [x] Build scripts added to `package.json`
- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Build settings verified
- [ ] Deployment successful
- [ ] App loads correctly

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Expo Web Documentation](https://docs.expo.dev/workflow/web/)
- [Deploying Expo to Vercel](https://docs.expo.dev/distribution/publishing-websites/)

---

**Need Help?** Check the build logs in Vercel dashboard for specific error messages!

