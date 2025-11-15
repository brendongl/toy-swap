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
│   ├── competitor-analysis.md      # Market research & competitors
│   ├── friction-analysis.md        # Edge cases & friction points
│   ├── valueless-model-analysis.md # Value-free matching model
│   ├── implementation-plan.md      # Complete tech spec & timeline
│   └── elevator-pitch.md           # Validation copy & messaging
│
├── app/                            # React Native mobile app (TBD)
│   ├── src/
│   │   ├── screens/               # App screens
│   │   ├── components/            # Reusable components
│   │   ├── navigation/            # Navigation config
│   │   ├── services/              # API calls
│   │   └── utils/                 # Helpers
│   ├── app.json                   # Expo config
│   └── package.json
│
├── api/                            # Node.js backend (TBD)
│   ├── src/
│   │   ├── routes/                # API endpoints
│   │   ├── controllers/           # Business logic
│   │   ├── models/                # Database models
│   │   └── middleware/            # Auth, validation
│   ├── supabase/
│   │   └── migrations/            # Database migrations
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- Supabase account (free tier)
- iOS Simulator (Mac) or Android Studio (Windows/Mac/Linux)

### Installation

**Coming soon** - project setup instructions will be added once development starts.

---

## 📋 Current Status

### ✅ Completed
- [x] Market research & competitor analysis
- [x] Product specification
- [x] Tech stack selection
- [x] Database schema design
- [x] User flow mapping
- [x] Validation messaging & copy
- [x] Implementation plan (12-week timeline)

### 🔄 In Progress
- [ ] User validation (landing page + surveys)
- [ ] Waitlist building (target: 200+ signups)

### ⏳ Upcoming
- [ ] Project setup (React Native + Node.js)
- [ ] Supabase configuration
- [ ] MVP development (12 weeks)
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

## 🤝 Contributing

This is currently a private project in planning phase. Once we validate demand and start development, contribution guidelines will be added.

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
