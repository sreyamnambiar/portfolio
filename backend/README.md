# Portfolio Contact Form Backend

Backend server that sends contact form submissions to your email.

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Gmail for Sending Emails

**Important:** You need a Gmail App Password (not your regular password)

1. **Enable 2-Factor Authentication on your Gmail:**
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or Other)
   - Click "Generate"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### 3. Create .env File
```bash
# Copy the example file
copy .env.example .env
```

Then edit `.env` and add your credentials:
```
EMAIL_USER=sreyamnambiar2005@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
PORT=5000
```

### 4. Start the Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# OR Production mode
npm start
```

You should see: `Server is running on port 5000`

### 5. Test It
Open another terminal and test:
```bash
curl http://localhost:5000/api/health
```

## 📧 How It Works

When someone submits your contact form:
1. The form sends data to `http://localhost:5000/api/contact`
2. The backend receives the data
3. Sends you a formatted email with their message
4. You can reply directly from your email!

## 🌐 Deploy to Production

### Option 1: Railway (Recommended - Free)
1. Create account: https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Connect your repo and select the `backend` folder
4. Add Environment Variables in Railway:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `PORT=5000`
5. Deploy! You'll get a URL like `https://your-app.railway.app`

### Option 2: Render
1. Create account: https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables
7. Deploy!

### 6. Update Frontend URL
After deploying, update Contact.jsx:
```javascript
const response = await fetch('https://your-deployed-backend-url.railway.app/api/contact', {
```

## 🔍 Troubleshooting

**"Invalid login" error:**
- Make sure you're using App Password, not regular Gmail password
- Check that 2FA is enabled on your Gmail

**CORS error:**
- Update `server.js` cors config to include your frontend URL

**Email not sending:**
- Check your .env file has correct credentials
- Check Gmail App Password is correct
- Try using a different email service (Outlook, Yahoo)

## 📝 Alternative: Using EmailJS (No Backend Needed!)

If you don't want to run a backend server, use EmailJS:
1. Sign up at https://www.emailjs.com
2. Follow their React integration guide
3. Much simpler, but less control
