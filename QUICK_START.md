# ToySwap Quick Start Guide

Get up and running with ToySwap in under 10 minutes!

---

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm or yarn installed (`npm --version`)
- ✅ Git installed (`git --version`)
- ✅ A Supabase account ([sign up here](https://supabase.com))
- ✅ Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

---

## 🚀 5-Minute Setup

### Step 1: Clone & Install (2 min)

```bash
# Clone repository
git clone https://github.com/your-username/toy-swap.git
cd toy-swap

# Install mobile app dependencies
cd app
npm install

# Install backend dependencies
cd ../api
npm install

cd ..
```

### Step 2: Set up Supabase (3 min)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Name it "ToySwap" and choose Singapore region
3. Wait for setup to complete (~2 minutes)
4. Go to **Project Settings** → **API**
5. Copy these values:
   - Project URL
   - `anon` public key
   - `service_role` key
6. Go to **Project Settings** → **Database**
7. Copy the connection string (URI format)

### Step 3: Configure Environment (1 min)

**Mobile App:**
```bash
cd app
cp .env.example .env
nano .env  # or use your favorite editor
```

Add your Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Backend:**
```bash
cd ../api
cp .env.example .env
nano .env
```

Add your Supabase credentials:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
DATABASE_URL=postgresql://postgres:your-password@db.xxxxx.supabase.co:5432/postgres
```

### Step 4: Set up Database (1 min)

```bash
cd api
npm run migrate
```

You should see:
```
🚀 Running database migrations...
✅ 001_initial_schema.sql completed successfully
✅ 002_row_level_security.sql completed successfully
✨ All migrations completed successfully!
```

### Step 5: Start Development (30 sec)

**Terminal 1 - Backend:**
```bash
cd api
npm run dev
```

**Terminal 2 - Mobile App:**
```bash
cd app
npm start
```

**On Your Phone:**
1. Open Expo Go app
2. Scan the QR code from Terminal 2
3. Wait for app to load

---

## ✅ Verify Setup

### Check Backend
Open browser: http://localhost:3000/health

Should see:
```json
{
  "status": "ok",
  "timestamp": "2025-11-15T...",
  "environment": "development"
}
```

### Check Mobile App
- App should load on your phone
- You should see placeholder screens

### Check Database
Go to Supabase dashboard → **Table Editor**

You should see 11 tables:
- users
- children
- toys
- swipes
- matches
- swap_proposals
- swaps
- messages
- reports
- ratings
- blocked_users

---

## 🎯 Next Steps

### Option A: Start Development
Follow the [Implementation Plan](docs/implementation-plan.md) to start building features:
1. Week 1: Authentication & Onboarding
2. Week 2: Toy Listing
3. Week 3: Browse & Swipe
4. Week 4: Matching

### Option B: Validate First (Recommended)
Before investing 12 weeks of development:
1. Create a landing page (Carrd/Webflow)
2. Run $50 Facebook ad test
3. Target: 50+ waitlist signups
4. If successful → Start development
5. If not → Pivot or improve messaging

---

## 📚 Learn More

- **Full setup**: [README.md](README.md)
- **Supabase guide**: [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
- **Implementation plan**: [docs/implementation-plan.md](docs/implementation-plan.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🐛 Troubleshooting

### Metro bundler won't start
```bash
cd app
npm start --clear
```

### Database connection fails
- Check DATABASE_URL has correct password
- Ensure Supabase project is not paused
- Try connecting via Supabase dashboard SQL editor first

### App crashes on phone
- Check `.env` file exists in `app/` directory
- Verify environment variables start with `EXPO_PUBLIC_`
- Restart Expo: `npm start --clear`

### Still stuck?
See full troubleshooting guide in [README.md](README.md#-troubleshooting)

---

**Happy coding! 🚀**
