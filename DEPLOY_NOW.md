# Deployment Quick Reference

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend `.env` file configured (not committed)
- [ ] Gmail App Password created
- [ ] Domain ready (if using custom domain)

---

## 🚂 RAILWAY DEPLOYMENT (Backend)

### Step 1: Deploy Backend
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. **Important**: Set **Root Directory** to `backend`

### Step 2: Configure Environment Variables
In Railway dashboard, add:
```
EMAIL_USER=sreyamnambiar2005@gmail.com
EMAIL_PASSWORD=<your-gmail-app-password>
```

### Step 3: Get Railway URL
- Railway will provide a URL like: `https://your-app-xxxxx.up.railway.app`
- Copy this URL for the next step

---

## ▲ VERCEL DEPLOYMENT (Frontend)

### Step 1: Deploy Frontend
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"** → Import your repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 2: Add Environment Variable
In Vercel → Project Settings → Environment Variables:
```
VITE_API_URL=https://your-app-xxxxx.up.railway.app
```
(Use your Railway URL from above)

### Step 3: Redeploy
- After adding the environment variable
- Go to Deployments → Click the three dots → Redeploy

---

## 🔧 LOCAL TESTING BEFORE DEPLOYMENT

### Test Backend:
```bash
cd backend
npm install
npm start
```
Backend should run on http://localhost:5000

### Test Frontend:
```bash
npm install
npm run dev
```
Frontend should run on http://localhost:5173

### Test Contact Form:
- Fill out the contact form
- Check if email is received

---

## 🌐 CUSTOM DOMAIN (Optional)

### For Frontend (Vercel):
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `sreyamnambiar.me`)
3. Add DNS records in your domain provider:
   - **Type**: A, **Host**: @, **Value**: 76.76.21.21
   - **Type**: CNAME, **Host**: www, **Value**: cname.vercel-dns.com

### For Backend (Railway):
1. Railway Dashboard → Settings → Networking
2. Add custom domain (e.g., `api.sreyamnambiar.me`)
3. Add DNS record in your domain provider:
   - **Type**: CNAME, **Host**: api, **Value**: your-app.up.railway.app

---

## 🎯 QUICK DEPLOY COMMANDS

### Commit and Push Changes:
```bash
git add .
git commit -m "Update API URL for production"
git push origin main
```

### Both platforms auto-deploy on push to main branch! 🚀

---

## ⚠️ IMPORTANT NOTES

1. **Gmail App Password**: 
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   
2. **CORS**: Backend already configured with `cors()` middleware

3. **Environment Variables**: 
   - Never commit `.env` files
   - Both `.env` files are in `.gitignore`

4. **Testing**: Always test locally before deploying

---

## 🆘 TROUBLESHOOTING

### Contact Form Not Working:
- Check browser console for errors
- Verify `VITE_API_URL` in Vercel environment variables
- Check Railway logs for backend errors
- Ensure EMAIL_USER and EMAIL_PASSWORD are set in Railway

### Railway Backend Not Starting:
- Check that `package.json` has `"start": "node server.js"`
- Verify all dependencies are in `package.json`
- Check Railway logs for errors

### Vercel Build Failing:
- Check that `dist` folder is the output directory
- Verify `vite.config.js` is properly configured
- Check build logs in Vercel dashboard

---

## 📊 MONITORING

### Vercel:
- Dashboard → Your Project → Analytics
- View pageviews, performance, etc.

### Railway:
- Dashboard → Your Project → Metrics
- View CPU, memory, network usage

---

**Ready to Deploy? Follow the steps above and you'll be live in minutes! 🎉**
