# DEPLOYMENT GUIDE

## Frontend Deployment (Vercel)

### Step 1: Build Your Project
```bash
npm run build
```

### Step 2: Deploy to Vercel

**Option A: Via GitHub (Recommended)**
1. Push your code to GitHub
2. Go to https://vercel.com
3. Sign up with GitHub
4. Click "Add New Project"
5. Import your portfolio repository
6. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click "Deploy"

**Option B: Via CLI**
```bash
npx vercel
```

### Step 3: Connect Your name.com Domain

**In Vercel Dashboard:**
1. Go to your project → Settings → Domains
2. Add your domain from name.com (e.g., `sreyamnambiar.me`)
3. Vercel will show you DNS records to add

**In name.com Dashboard:**
1. Go to name.com → Your Domains → DNS Records
2. Add the records Vercel provided:
   - Type: A, Host: @, Answer: 76.76.21.21
   - Type: CNAME, Host: www, Answer: cname.vercel-dns.com
3. Wait 10-60 minutes for DNS propagation

### Step 4: Enable HTTPS
- Vercel automatically provisions SSL certificate
- Your site will be live at `https://sreyamnambiar.me` 🎉

---

## Backend Deployment (Railway)

### Step 1: Push Backend to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin <your-backend-repo-url>
git push -u origin main
```

### Step 2: Deploy to Railway
1. Go to https://railway.app
2. Sign up with GitHub (free $5/month credit)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your backend repository
5. Add Environment Variables:
   - `EMAIL_USER`: sreyamnambiar2005@gmail.com
   - `EMAIL_PASSWORD`: your-app-password
   - `PORT`: 5000
6. Deploy!

### Step 3: Get Your Backend URL
- Railway will give you a URL like: `https://your-app.up.railway.app`

### Step 4: Update Frontend Contact Form
Update `src/components/Contact.jsx`:
```javascript
const response = await fetch('https://your-app.up.railway.app/api/contact', {
```

Then redeploy frontend.

---

## Alternative: Deploy Both on Same Domain

### Backend as API Subdomain
In name.com, add:
- Type: CNAME, Host: api, Answer: your-app.up.railway.app

Then your backend will be at: `https://api.sreyamnambiar.me`

---

## Quick Checklist
- [ ] Claim GitHub Student Pack
- [ ] Register domain on name.com
- [ ] Push code to GitHub
- [ ] Deploy frontend to Vercel
- [ ] Connect custom domain
- [ ] Deploy backend to Railway
- [ ] Update backend URL in Contact.jsx
- [ ] Test contact form
- [ ] Celebrate! 🎉
