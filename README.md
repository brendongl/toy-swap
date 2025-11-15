# 🔄 ToySwap - Tinder for Toys

> **Swipe. Match. Swap.** The mobile app that helps parents exchange toys locally, for free.

[![Status](https://img.shields.io/badge/status-planning-yellow)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

---

## 🎯 The Problem

Parents face three frustrations:
1. **Partner arguments** about constant toy purchases
2. **Hours wasted** selling toys on Chợ Tốt just to buy more
3. **Language barriers** preventing expats and locals from trading

## 💡 The Solution

ToySwap is a mobile app (iOS + Android) where parents:
- Browse toys with a Tinder-style swipe interface
- Match when both like each other's toys
- Pick specific toys to swap
- Meet at a public location and exchange
- No money. No haggling. Just simple swaps.

**Target Market**: District 2, HCMC (Vietnam) - starting with expat community

---

## 📱 Product Overview

### Core Features (MVP)
- ✅ Preference-based matching (no value calculations)
- ✅ Tinder-style swipe interface
- ✅ User-to-user matching
- ✅ Post-match negotiation (pick specific toys)
- ✅ In-app chat (no phone numbers shared)
- ✅ Swap codes for meetup verification
- ✅ Trust scoring system
- ✅ English + Vietnamese support

### Tech Stack
- **Frontend**: React Native (Expo)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth (phone/email/social)
- **Storage**: Supabase Storage (toy photos)
- **Real-time**: Supabase Real-time (chat)
- **Push**: Expo Push Notifications
- **Analytics**: Mixpanel

---

## 📂 Project Structure

```
toy-swap/
├── docs/                           # Project documentation
│   ├── README.md                   # Documentation index
│   ├── competitor-analysis.md      # Market research & competitors
│   ├── friction-analysis.md        # Edge cases & friction points
│   ├── valueless-model-analysis.md # Value-free matching model
│   ├── implementation-plan.md      # Complete tech spec & timeline
│   └── elevator-pitch.md           # Validation copy & messaging
│
├── app/                            # React Native mobile app
│   ├── src/
│   │   ├── screens/               # App screens
│   │   ├── components/            # Reusable components
│   │   ├── navigation/            # Navigation config
│   │   ├── services/              # API calls & Supabase
│   │   ├── utils/                 # Helpers
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── store/                 # Zustand state management
│   │   ├── types/                 # TypeScript types
│   │   └── assets/                # Images, fonts
│   ├── App.tsx                    # Root component
│   ├── app.json                   # Expo config
│   ├── eas.json                   # EAS Build config
│   ├── tsconfig.json              # TypeScript config
│   ├── .eslintrc.js               # ESLint config
│   ├── .env.example               # Environment template
│   └── package.json
│
├── api/                            # Node.js backend
│   ├── src/
│   │   ├── routes/                # API endpoints
│   │   ├── controllers/           # Business logic
│   │   ├── models/                # Database models
│   │   ├── middleware/            # Auth, validation, errors
│   │   ├── services/              # Business services
│   │   ├── utils/                 # Helper functions
│   │   ├── types/                 # TypeScript types
│   │   ├── config/                # Database & app config
│   │   └── index.ts               # Server entry point
│   ├── supabase/
│   │   ├── migrations/            # Database migrations
│   │   │   ├── 001_initial_schema.sql
│   │   │   └── 002_row_level_security.sql
│   │   └── README.md
│   ├── scripts/
│   │   └── migrate.js             # Migration runner
│   ├── tsconfig.json              # TypeScript config
│   ├── .eslintrc.js               # ESLint config
│   ├── .env.example               # Environment template
│   └── package.json
│
├── .github/
│   └── workflows/                 # GitHub Actions
│       ├── ci.yml                 # Continuous integration
│       └── eas-build.yml          # Mobile app builds
│
├── .gitignore
├── .prettierrc                     # Prettier config
├── .prettierignore
├── README.md                       # This file
├── SUPABASE_SETUP.md              # Supabase setup guide
├── GITHUB_SETUP.md                # GitHub setup guide
├── CONTRIBUTING.md                # Contribution guidelines
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo account (for EAS builds)
- Supabase account (free tier)
- iOS Simulator (Mac) or Android Studio (Windows/Mac/Linux)
- Git

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/toy-swap.git
cd toy-swap
```

#### 2. Set up Supabase
Follow the comprehensive guide in [SUPABASE_SETUP.md](SUPABASE_SETUP.md) to:
- Create a Supabase project
- Get your API keys
- Set up authentication
- Configure storage for toy photos
- Enable real-time features

#### 3. Configure environment variables

**Mobile App** (`/app/.env`):
```bash
cd app
cp .env.example .env
# Edit .env and add your Supabase credentials
```

**Backend API** (`/api/.env`):
```bash
cd api
cp .env.example .env
# Edit .env and add your Supabase credentials and database URL
```

#### 4. Install dependencies

**Mobile App**:
```bash
cd app
npm install
```

**Backend API**:
```bash
cd api
npm install
```

#### 5. Run database migrations
```bash
cd api
npm run migrate
```

This creates all necessary tables in your Supabase database.

#### 6. Start development servers

**Terminal 1 - Backend API**:
```bash
cd api
npm run dev
# Server runs on http://localhost:3000
```

**Terminal 2 - Mobile App**:
```bash
cd app
npm start
# Opens Expo DevTools in browser
```

**Terminal 3 - Run on device/simulator**:
```bash
# iOS (Mac only)
npm run ios

# Android
npm run android

# Or scan QR code with Expo Go app on your phone
```

### Development Workflow

#### Running Tests
```bash
# Mobile app
cd app
npm test

# Backend API
cd api
npm test
```

#### Type Checking
```bash
# Mobile app
cd app
npm run type-check

# Backend API
cd api
npm run type-check
```

#### Linting
```bash
# Mobile app
cd app
npm run lint

# Backend API
cd api
npm run lint
```

#### Building for Production
```bash
# Mobile app (using EAS)
cd app
eas build --platform ios
eas build --platform android

# Backend API
cd api
npm run build
npm start
```

---

## 📋 Current Status

### ✅ Completed - Planning Phase
- [x] Market research & competitor analysis
- [x] Product specification
- [x] Tech stack selection
- [x] Database schema design
- [x] User flow mapping
- [x] Validation messaging & copy
- [x] Implementation plan (12-week timeline)

### ✅ Completed - Development Setup
- [x] React Native app structure with Expo
- [x] Node.js backend with Express
- [x] TypeScript configuration
- [x] Supabase configuration guide
- [x] Database migrations (11 tables + RLS)
- [x] ESLint & Prettier setup
- [x] GitHub Actions CI/CD
- [x] Environment templates
- [x] Development documentation

### 🔄 Next Steps
1. **Validation Phase** (Recommended before development)
   - [ ] Create landing page
   - [ ] Run Facebook ads ($50 test)
   - [ ] Collect 50+ waitlist signups

2. **Development Phase** (Week 1-4: Foundation)
   - [ ] Implement authentication (phone/email)
   - [ ] Build onboarding flow
   - [ ] Create toy listing feature
   - [ ] Build profile management

### ⏳ Upcoming (Weeks 5-12)
- [ ] Swipe & matching features
- [ ] Swap negotiation flow
- [ ] In-app chat
- [ ] Beta testing (District 2 parents)
- [ ] Public launch

---

## 📖 Documentation

All planning documents are in the `/docs` folder:

- **[Implementation Plan](docs/implementation-plan.md)** - Complete tech spec, timeline, budget (READ THIS FIRST!)
- **[Competitor Analysis](docs/competitor-analysis.md)** - Market research, competitors, opportunities
- **[Friction Analysis](docs/friction-analysis.md)** - Edge cases, user pain points, solutions
- **[Valueless Model Analysis](docs/valueless-model-analysis.md)** - Why we chose preference-based matching
- **[Elevator Pitch](docs/elevator-pitch.md)** - Validation copy for Facebook, Reddit, surveys

---

## 🎯 Success Metrics

**North Star Metric**: Completed swaps per month

**Targets**:
- Month 1: 200 users, 10 swaps
- Month 2: 300 users, 20 swaps
- Month 3: 400 users, 40 swaps

**Validation Criteria** (before building):
- ✅ 50%+ survey respondents say "Very interested"
- ✅ 100+ waitlist signups
- ✅ < 30% cite trust as dealbreaker

---

## 🛠️ Development Timeline

**12-week plan to MVP**:

- **Weeks 1-4**: Foundation (Auth, Toys, Browse)
- **Weeks 5-8**: Swap Flow (Match, Negotiate, Complete)
- **Weeks 9-12**: Polish & Launch (Analytics, Testing, Beta)

See [Implementation Plan](docs/implementation-plan.md) for detailed week-by-week breakdown.

---

## 💰 Budget

**MVP Cost**: $15,000 - $25,000
- Development: $10,800 - $36,000 (contractor)
- Infrastructure: $200 - $550/year (Supabase, hosting)
- Marketing: $900 - $1,950 (pre-launch + 3 months)
- Legal: $1,250 - $2,700 (T&C, privacy policy)

See [Implementation Plan](docs/implementation-plan.md) for detailed breakdown.

---

## 🐛 Troubleshooting

### Common Issues

#### "Cannot find module" errors
```bash
# Delete node_modules and reinstall
cd app  # or cd api
rm -rf node_modules package-lock.json
npm install
```

#### Expo app won't connect to development server
1. Ensure your phone and computer are on the same WiFi network
2. Try running with tunnel: `npx expo start --tunnel`
3. Check firewall settings allow Metro bundler (port 8081)

#### Database migration fails
1. Check your `DATABASE_URL` in `/api/.env`
2. Verify Supabase project is active (not paused)
3. Ensure password doesn't contain special characters that need escaping
4. Try running migrations manually via Supabase SQL Editor

#### "supabase is not defined" in mobile app
- Check `.env` file exists in `/app` directory
- Verify environment variables start with `EXPO_PUBLIC_`
- Restart Expo development server: `npm start --clear`

#### TypeScript errors
```bash
# Clear TypeScript cache
cd app  # or cd api
npm run type-check
```

#### GitHub Actions CI failing
- Check that both `app/package-lock.json` and `api/package-lock.json` exist
- Run `npm install` in both directories to generate lock files
- Commit lock files to repository

### Getting Help

If you encounter issues:
1. Check [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for database setup
2. Review [Implementation Plan](docs/implementation-plan.md) for architecture details
3. Open an issue on GitHub (coming soon)

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Code style and standards
- Development workflow
- Pull request process
- Testing requirements

This project follows the [ToySwap Implementation Plan](docs/implementation-plan.md) for development priorities.

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Status**: Pre-launch validation phase

For inquiries or feedback:
- Email: [Your email - TBD]
- Facebook: [ToySwap District 2 - TBD]
- Survey: [Validation survey link - TBD]

---

## 🙏 Acknowledgments

Built for the District 2 parent community in Ho Chi Minh City, Vietnam.

Special thanks to:
- Early survey respondents
- Beta testers (coming soon)
- The HCMC expat community

---

**Last Updated**: January 2025
**Version**: 0.1.0 (Planning Phase)
