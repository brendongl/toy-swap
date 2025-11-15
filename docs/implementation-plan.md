# ToySwap Mobile App - Complete Implementation Plan
*Version 1.0 - MVP for iOS & Android in Vietnam Market*

---

## Executive Summary

**Product**: ToySwap - A mobile app where parents swipe on toys they want and match with other parents for local toy exchanges.

**Market**: Vietnam (starting District 2, HCMC - expat community)

**Model**: Preference-based matching (no value calculations) + post-match negotiation

**Timeline**: 12 weeks to launch MVP

**Budget**: $15,000-25,000 (bootstrapped) or $40,000-60,000 (funded)

**Success Criteria**: 200 users, 20 completed swaps/month within 3 months of launch

---

## Table of Contents

1. [Product Specification](#product-specification)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Feature Breakdown](#feature-breakdown)
5. [User Experience Flow](#user-experience-flow)
6. [Database Schema](#database-schema)
7. [Success Metrics](#success-metrics)
8. [Development Timeline](#development-timeline)
9. [Team & Roles](#team--roles)
10. [Budget & Costs](#budget--costs)
11. [Risk Mitigation](#risk-mitigation)
12. [Go-to-Market Strategy](#go-to-market-strategy)
13. [Post-Launch Roadmap](#post-launch-roadmap)

---

## 1. Product Specification

### Core Value Proposition
> "Tinder for toys. Swipe on toys your kid would love, match with parents nearby, and arrange a simple swap. No pricing, no haggling—just preference-based exchanges."

### Target Users
- **Primary**: Expat parents in District 2, HCMC
  - English-speaking
  - Ages 25-40
  - Children aged 0-8 years
  - Tech-savvy
  - High toy turnover rate

- **Secondary** (Phase 2): Vietnamese local parents
  - Vietnamese + English bilingual app
  - Similar demographics

### Key Design Decisions (Final)

| Decision Point | Chosen Approach | Rationale |
|----------------|-----------------|-----------|
| **Value system** | None - preference only | Eliminates trust issues, simplifies UX |
| **Matching level** | User-to-user (not toy-to-toy) | Reduces fragmentation, clearer negotiation |
| **Post-match flow** | Sequential negotiation (3 rounds max) | Bounded friction, familiar pattern |
| **Contact sharing** | In-app chat + Swap Code for meetup | Privacy-safe, no phone numbers |
| **Geographic scope** | Single district (District 2) first | Critical mass needed for matching |
| **Platform** | iOS + Android native (React Native) | Reach both platforms with shared codebase |
| **Multi-toy swaps** | 1-for-1 only in MVP | Simplicity first, bundles in V2 |
| **Monetization** | Free for MVP | Validate model before adding friction |

---

## 2. Tech Stack

### Mobile Frontend (iOS + Android)

**Framework: React Native (Expo)**

**Why React Native:**
- ✅ Single codebase for iOS + Android (faster, cheaper)
- ✅ Mature ecosystem (libraries for camera, chat, maps)
- ✅ Hot reload (faster development)
- ✅ Easy to hire developers in Vietnam
- ✅ Can eject to native if needed later
- ✅ Good performance for CRUD app (not a game)

**Key Libraries:**
```
- expo-camera: Photo capture
- expo-image-picker: Gallery access
- react-navigation: Navigation
- react-native-gesture-handler: Swipe gestures (Tinder-style)
- react-native-maps: Show nearby swap locations
- react-native-gifted-chat: In-app messaging
- @notifee/react-native: Push notifications
- react-native-fast-image: Image caching/optimization
```

**State Management:**
- **Zustand** (simple, lightweight alternative to Redux)
- **React Query** for server state (caching, invalidation)

**Design System:**
- **React Native Paper** or **NativeBase** (pre-built components)
- Custom theme for brand colors

---

### Backend

**Framework: Node.js + Express (or Fastify)**

**Why Node.js:**
- ✅ JavaScript everywhere (frontend devs can contribute)
- ✅ Great real-time support (WebSockets for chat)
- ✅ Large ecosystem (npm packages)
- ✅ Easy to deploy (Vercel, Railway, Render)

**Alternative: Python + FastAPI** (if you prefer Python)
- ✅ Excellent for future ML features (recommendation engine)
- ✅ Type safety with Pydantic
- ❌ Smaller ecosystem for real-time features

**Recommendation: Node.js for MVP** (faster iteration)

---

### Database

**Primary Database: PostgreSQL (Supabase or Railway)**

**Why Postgres:**
- ✅ Relational data (users, toys, matches, swaps)
- ✅ JSONB support (flexible toy metadata)
- ✅ PostGIS extension (geospatial queries for nearby users)
- ✅ Row-level security (Supabase)
- ✅ Real-time subscriptions (Supabase)

**Managed Service Options:**
- **Supabase** (Recommended for MVP)
  - Built-in auth
  - Built-in real-time
  - Built-in storage (for images)
  - Free tier (up to 500MB database)
  - $25/month after free tier

- **Railway**
  - Simple deployment
  - Generous free tier
  - $5/month after free tier

**Alternative: Firebase (Google)**
- ✅ Real-time out of the box
- ✅ Built-in auth
- ❌ NoSQL (harder to query complex relationships)
- ❌ Expensive at scale

**Recommendation: Supabase** (SQL + real-time + storage + auth all-in-one)

---

### File Storage (Toy Photos)

**Supabase Storage** (included with Supabase)
- Free tier: 1GB storage
- CDN-backed (fast image loading)
- Automatic image resizing (Supabase has image transformations)

**Alternative: Cloudinary**
- Better image optimization
- $0 for 25GB bandwidth/month
- Auto-format based on device (WebP for modern, JPG for old)

**Recommendation: Start with Supabase Storage**, migrate to Cloudinary if image performance becomes issue.

---

### Authentication

**Supabase Auth**
- Phone number (SMS) verification (common in Vietnam)
- Email + password (for expats)
- Google Sign-In (optional)
- Facebook Sign-In (very popular in Vietnam)

**Flow:**
1. User signs up with phone or email
2. Verification code sent
3. User creates profile (name, district, child's age)
4. Profile complete → Can browse toys

---

### Push Notifications

**Expo Push Notifications** (free, built into Expo)

**Use cases:**
- "You have a new match!"
- "User B responded to your swap proposal"
- "Reminder: Complete your swap with User A"
- "New toys available in District 2"

---

### Real-Time Features (Chat)

**Supabase Real-time** for:
- In-app chat messages
- Match notifications
- Swap status updates

**Alternative: Socket.io**
- More control
- Better for complex real-time logic
- ❌ More setup required

**Recommendation: Supabase Real-time** (simpler for MVP)

---

### Analytics

**Mixpanel** (free tier: 100K events/month)
- Track user actions (swipes, matches, swaps)
- Funnel analysis (sign-up → first swap)
- Retention cohorts

**Alternative: PostHog**
- Open-source
- Self-hosted option (cheaper)
- Session replay (see user behavior)

**Recommendation: Mixpanel** (easier setup, good free tier)

---

### Geolocation

**Google Maps API** (for "nearby users" feature)
- Geocoding (address → lat/long)
- Reverse geocoding (lat/long → district)
- Distance calculations

**Cost:** $5 per 1,000 requests after free $200 credit/month

**Alternative: Mapbox**
- Better customization
- Similar pricing

---

### Infrastructure / Hosting

**Backend:**
- **Railway** or **Render** (easy Node.js deployment)
- Auto-deploy from GitHub
- $5-10/month

**Database:**
- **Supabase** free tier → $25/month Pro tier

**Total hosting cost:** $5-35/month depending on usage

---

### Development Tools

**Version Control:**
- GitHub (free private repos)

**CI/CD:**
- GitHub Actions (free for public repos, 2,000 min/month for private)
- EAS Build (Expo Application Services) for app builds

**Testing:**
- Jest (unit tests)
- React Native Testing Library
- Detox (E2E testing - optional for MVP)

**Code Quality:**
- ESLint (linting)
- Prettier (formatting)
- TypeScript (type safety - highly recommended)

---

### Tech Stack Summary

```
FRONTEND (Mobile)
├── React Native (Expo)
├── TypeScript
├── Zustand (state)
├── React Query (server state)
└── React Navigation

BACKEND
├── Node.js + Express
├── TypeScript
├── Supabase (database + auth + storage + real-time)
└── PostGIS (geospatial queries)

INFRASTRUCTURE
├── Railway/Render (backend hosting)
├── Supabase (database + storage)
├── Expo Push Notifications
├── Mixpanel (analytics)
└── Google Maps API (geocoding)

DEVELOPMENT
├── GitHub
├── GitHub Actions (CI/CD)
├── EAS Build (app builds)
└── Expo Go (testing on device)
```

---

## 3. System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         MOBILE APP                           │
│                     (React Native / Expo)                    │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Auth     │  │   Swipe    │  │   Chat     │           │
│  │   Screen   │  │   Screen   │  │   Screen   │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │  My Toys   │  │  Matches   │  │  Profile   │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTPS / WebSocket
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      API SERVER                              │
│                  (Node.js + Express)                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    API Routes                         │  │
│  │  /auth /toys /swipes /matches /swaps /chat /users    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 Business Logic                        │  │
│  │  • Matching algorithm                                 │  │
│  │  • Swap negotiation state machine                    │  │
│  │  • Trust score calculation                           │  │
│  │  • Notification triggers                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE                                  │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  PostgreSQL │  │   Storage   │  │  Real-time  │        │
│  │  (Database) │  │  (Images)   │  │  (Chat)     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                              │
│  ┌─────────────┐                                            │
│  │    Auth     │                                            │
│  │   Service   │                                            │
│  └─────────────┘                                            │
└─────────────────────────────────────────────────────────────┘
                           │
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 THIRD-PARTY SERVICES                         │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Expo     │  │ Google   │  │ Mixpanel │  │ Cloudinary│  │
│  │ Push     │  │ Maps     │  │          │  │ (optional)│  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

### Data Flow: Swiping & Matching

```
1. USER SWIPES RIGHT
   App → API: POST /swipes { user_id, toy_id }
   API checks: Has User B already swiped on User A's toys?

   IF YES (mutual interest) → Create MATCH
     • Insert into matches table
     • Send push notification to both users
     • Return match object

   IF NO → Record swipe, wait for reciprocation

2. USERS PICK SPECIFIC TOYS TO SWAP
   App → API: POST /swap-proposals { match_id, offer_toy_id, request_toy_id }
   API → Database: Insert proposal, status = "pending"
   API → Push: Notify other user "New swap proposal"

3. USER ACCEPTS/COUNTERS
   App → API: PUT /swap-proposals/:id { action: "accept" | "counter", ... }
   API → Database: Update proposal

   IF ACCEPT → Create swap, status = "active"
   IF COUNTER → Create new proposal, increment counter (max 3)
   IF EXPIRED → Mark match as expired

4. SWAP COMPLETION
   App → API: POST /swaps/:id/complete { user_id }
   API checks: Both users confirmed?

   IF YES → Swap status = "completed", update toy availability
   IF NO → Wait for other user
```

---

## 4. Feature Breakdown

### MVP Features (Must Have)

#### 4.1 Authentication & Onboarding
- [ ] Sign up with phone number (SMS verification)
- [ ] Sign up with email + password
- [ ] Facebook/Google login (optional)
- [ ] Onboarding flow:
  - Welcome screens (3 slides explaining app)
  - Collect: Name, Location (district), Child's age
  - Request permissions: Camera, Photos, Notifications, Location
- [ ] Terms of Service + Privacy Policy acceptance

**Estimated Effort:** 1 week

---

#### 4.2 Profile Management
- [ ] View/edit profile:
  - Name
  - Profile photo (optional)
  - District/neighborhood
  - Children (age range: 0-1yr, 1-3yr, 3-5yr, 5-8yr)
  - Bio (optional)
- [ ] Trust score display (0-5 stars)
- [ ] Swap history (completed swaps count)
- [ ] Settings:
  - Notifications on/off
  - Language (English/Vietnamese)
  - Delete account

**Estimated Effort:** 3 days

---

#### 4.3 Add Toys (Core Feature)
- [ ] Take photo OR upload from gallery
- [ ] Multi-photo upload (up to 5 photos per toy)
- [ ] Image compression (max 1MB per photo)
- [ ] Required fields:
  - Title (e.g., "Wooden blocks set")
  - Age range (dropdown: 0-1yr, 1-3yr, 3-5yr, 5-8yr, 8+)
  - Condition (dropdown: Like New, Good, Fair, Well-Loved)
- [ ] Optional fields:
  - Description (200 char max)
  - Original price (text field, for reference only)
  - Brand (text field)
- [ ] "Mark as available to swap" toggle
- [ ] Save as draft (can complete later)

**Estimated Effort:** 5 days

---

#### 4.4 My Toys Management
- [ ] List view of all user's toys
- [ ] Filter: Available / Not Available / Currently in swap
- [ ] Edit toy details
- [ ] Delete toy
- [ ] Mark available/unavailable (toggle)
- [ ] View swipe count per toy (analytics)

**Estimated Effort:** 3 days

---

#### 4.5 Browse & Swipe (Core Feature)
- [ ] Card-based UI (Tinder-style)
- [ ] Show toys from other users (randomized, with filters)
- [ ] Filters applied:
  - Same district only
  - Marked "available"
  - Age-appropriate (based on user's children's ages)
  - Exclude already-swiped toys
- [ ] Swipe gestures:
  - Swipe right = "I want this"
  - Swipe left = "Not interested"
  - Tap card = View details
- [ ] Toy detail view:
  - All photos (swipeable gallery)
  - Title, description, condition, age range
  - Owner's profile (name, trust score, district)
  - "Swipe Right" / "Pass" buttons
- [ ] Daily limit: 50 right swipes per day (prevent spam)
- [ ] Empty state: "No more toys to browse today. Check back tomorrow!"

**Estimated Effort:** 1 week

---

#### 4.6 Matching (Core Feature)
- [ ] Detect mutual swipes (user-to-user level)
- [ ] Create match entry in database
- [ ] Send push notifications to both users
- [ ] Match badge/counter on tab bar
- [ ] Matches screen:
  - List of active matches
  - Show matched user's profile
  - Show toys they liked from you
  - Show toys you liked from them
  - "Start negotiation" button

**Estimated Effort:** 3 days

---

#### 4.7 Swap Negotiation (Core Feature)
- [ ] After match, user can propose specific swap:
  - "I'll give you Toy A for your Toy X"
- [ ] Other user receives notification
- [ ] Other user can:
  - Accept (→ swap confirmed)
  - Counter-offer (pick different toys)
  - Decline (→ match ends)
- [ ] Max 3 rounds of negotiation
- [ ] After 3 rounds, match expires
- [ ] Expiry timer: 48 hours per round
- [ ] Proposal history visible (see past offers)

**Estimated Effort:** 5 days

---

#### 4.8 In-App Chat (Simplified)
- [ ] After swap confirmed, unlock chat
- [ ] Simple text-only messaging
- [ ] Real-time messages (Supabase real-time)
- [ ] Push notifications for new messages
- [ ] Purpose: Coordinate meetup details
- [ ] No media sharing in MVP (text only)
- [ ] "Report user" button
- [ ] Block user option

**Estimated Effort:** 4 days

---

#### 4.9 Swap Code System
- [ ] After swap confirmed, generate unique 6-digit code
- [ ] Display code to both users
- [ ] Instruction: "Share this code when you meet to verify the swap"
- [ ] Suggest public meetup location:
  - Show 3 nearby cafes/parks (Google Places API)
  - "Meet at [Location Name], [Address]"
- [ ] "I completed the swap" button
  - Enter code from other user
  - OR just confirm (trust-based)
- [ ] Both users must confirm completion

**Estimated Effort:** 3 days

---

#### 4.10 Trust & Safety
- [ ] Report user (reasons: No-show, Rude behavior, Misleading photos, Other)
- [ ] Block user (prevents future matches)
- [ ] Trust score calculation:
  - Start: 3.0/5.0
  - +0.5 per completed swap (max 5.0)
  - -1.0 per reported no-show (min 0.0)
  - -0.5 per canceled swap (if > 2 cancellations)
- [ ] Low trust warning: "This user has a trust score below 2.5. Proceed with caution."
- [ ] Auto-suspend accounts with trust < 1.0

**Estimated Effort:** 3 days

---

#### 4.11 Notifications
- [ ] Push notifications for:
  - New match
  - Swap proposal received
  - Proposal accepted/countered
  - New chat message
  - Swap completion reminder (if pending > 5 days)
  - Re-engagement: "New toys in District 2!" (weekly)
- [ ] In-app notification center (list of notifications)
- [ ] Notification preferences (turn off types)

**Estimated Effort:** 2 days

---

#### 4.12 Swap History
- [ ] List of completed swaps
- [ ] Details:
  - What I gave
  - What I received
  - Date
  - Other user
- [ ] Rate swap experience (1-5 stars)
- [ ] Optional feedback text
- [ ] Stats: Total swaps completed

**Estimated Effort:** 2 days

---

### V2 Features (Post-MVP)

These are explicitly **OUT OF SCOPE** for MVP but planned for later:

- [ ] Multi-toy bundle swaps (2 toys for 1 toy)
- [ ] Shipping label generation
- [ ] Auto-book Grab delivery
- [ ] Buy/sell marketplace (cash transactions)
- [ ] Wishlists ("Toys I'm looking for")
- [ ] Toy library subscription model
- [ ] Referral program (invite friends, earn points)
- [ ] "Swap Parties" event coordination
- [ ] AI-powered toy recommendations
- [ ] Video calls for toy verification
- [ ] Escrow service (hold toys until both ship)
- [ ] Vietnamese language support (MVP is English only)
- [ ] Hanoi expansion (MVP is HCMC only)

---

## 5. User Experience Flow

### 5.1 New User Journey

```
┌─────────────────────────────────────────────────────────────┐
│                     APP LAUNCH                               │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  ONBOARDING SCREENS                          │
│  • Slide 1: "Swipe on toys your kid will love"             │
│  • Slide 2: "Match with parents nearby"                    │
│  • Slide 3: "Arrange a simple swap"                        │
│                                                              │
│  [Get Started] button                                       │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    SIGN UP                                   │
│  • Phone number + SMS code                                  │
│  OR                                                          │
│  • Email + password                                         │
│  OR                                                          │
│  • "Continue with Facebook" button                          │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  CREATE PROFILE                              │
│  • Enter name                                               │
│  • Upload profile photo (optional)                          │
│  • Select district (dropdown: District 1, 2, 3...)         │
│  • Add child(ren) age range(s)                              │
│                                                              │
│  [Continue] button                                          │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  PERMISSIONS                                 │
│  "To use ToySwap, we need access to:"                       │
│  • 📷 Camera (to photograph toys)                           │
│  • 🖼️ Photos (to upload toy images)                         │
│  • 🔔 Notifications (for matches & messages)                │
│  • 📍 Location (to find nearby toys)                        │
│                                                              │
│  [Allow All] [Ask Me Later]                                 │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│               EMPTY STATE - NO TOYS YET                      │
│                                                              │
│  "Let's add your first toy!"                                │
│                                                              │
│  [+ Add a Toy] (big button)                                 │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   ADD TOY FLOW                               │
│  1. Take/upload photo(s)                                    │
│  2. Enter title                                             │
│  3. Select age range                                        │
│  4. Select condition                                        │
│  5. Toggle "Available to swap"                              │
│  6. [Save Toy]                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│             SUCCESS - "Toy Added!"                           │
│                                                              │
│  "Your toy is now visible to others."                       │
│                                                              │
│  [Add Another Toy] [Start Browsing]                         │
└─────────────────────────────────────────────────────────────┘
```

---

### 5.2 Browsing & Matching Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSE SCREEN                             │
│                    (Tinder-style)                            │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                                                        │ │
│  │       [TOY PHOTO - Large Card]                        │ │
│  │                                                        │ │
│  │   Title: "Wooden building blocks"                     │ │
│  │   Age: 1-3 years                                      │ │
│  │   Condition: Like New                                 │ │
│  │   Owner: Sarah M. (⭐️ 4.5) • District 2              │ │
│  │                                                        │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
│      [❌ Pass]              [❤️ I Want This]                │
└─────────────────────────────────────────────────────────────┘
                           │
                    Swipe Right ❤️
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  IF NO MUTUAL MATCH YET:                                    │
│                                                              │
│  "Liked! We'll notify you if they like your toys too."      │
│                                                              │
│  → Next toy card appears                                    │
└─────────────────────────────────────────────────────────────┘
                           │
                  OR (if mutual match)
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              🎉 "IT'S A MATCH!" 🎉                          │
│                                                              │
│  You and Sarah M. both liked each other's toys!             │
│                                                              │
│  Sarah liked:                                               │
│  • Your wooden blocks                                       │
│  • Your toy car set                                         │
│                                                              │
│  You liked:                                                 │
│  • Her building blocks                                      │
│                                                              │
│  [Pick Toys to Swap] [Keep Browsing]                        │
└─────────────────────────────────────────────────────────────┘
```

---

### 5.3 Swap Negotiation Flow

```
┌─────────────────────────────────────────────────────────────┐
│              PICK TOYS TO SWAP SCREEN                        │
│                                                              │
│  "Choose which toys to trade with Sarah"                    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ YOU'LL GIVE:                                        │   │
│  │ ○ Wooden blocks                                     │   │
│  │ ○ Toy car set                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ YOU'LL GET:                                         │   │
│  │ ● Building blocks ✓                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  [Propose This Swap]                                        │
└─────────────────────────────────────────────────────────────┘
                           │
                  User proposes: "Wooden blocks ↔ Building blocks"
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              SARAH'S PHONE (Notification)                    │
│                                                              │
│  "John proposed a swap with you!"                           │
│                                                              │
│  John offers: Wooden blocks                                 │
│  For your: Building blocks                                  │
│                                                              │
│  [View Proposal]                                            │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│            SARAH'S PROPOSAL SCREEN                           │
│                                                              │
│  John wants to swap:                                        │
│  His: Wooden blocks                                         │
│  For your: Building blocks                                  │
│                                                              │
│  [Accept Swap] [Counter-Offer] [Decline]                    │
└─────────────────────────────────────────────────────────────┘
                           │
                   Sarah clicks [Accept]
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              🎊 "SWAP CONFIRMED!" 🎊                        │
│                                                              │
│  You and Sarah agreed to swap:                              │
│  Your wooden blocks ↔ Her building blocks                   │
│                                                              │
│  Your swap code: 482791                                     │
│                                                              │
│  Suggested meetup locations:                                │
│  📍 Starbucks District 2 (0.5km away)                       │
│  📍 Vincom Center (1.2km away)                              │
│                                                              │
│  [Chat with Sarah] [I Completed Swap]                       │
└─────────────────────────────────────────────────────────────┘
```

---

### 5.4 Main App Navigation

**Bottom Tab Bar (5 tabs):**

```
┌────────────────────────────────────────────────────┐
│ [🏠 Browse] [🧸 My Toys] [💬 Matches] [👤 Profile] │
└────────────────────────────────────────────────────┘
```

1. **Browse** (Home): Tinder-style swipe interface
2. **My Toys**: List of user's toys, + Add button
3. **Matches**: List of active matches/negotiations/pending swaps
4. **Profile**: User profile, settings, swap history

---

## 6. Database Schema

### Core Tables (PostgreSQL)

#### 6.1 `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255), -- if email/password auth
  name VARCHAR(100) NOT NULL,
  profile_photo_url TEXT,
  district VARCHAR(50) NOT NULL, -- e.g., "District 2"
  location GEOGRAPHY(POINT, 4326), -- lat/long for geo queries
  bio TEXT,
  trust_score DECIMAL(3,2) DEFAULT 3.00, -- 0.00 to 5.00
  completed_swaps_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP, -- soft delete

  CHECK (trust_score >= 0 AND trust_score <= 5)
);

CREATE INDEX idx_users_district ON users(district);
CREATE INDEX idx_users_location ON users USING GIST(location);
```

---

#### 6.2 `children`
```sql
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  age_range VARCHAR(20) NOT NULL, -- "0-1yr", "1-3yr", "3-5yr", "5-8yr", "8+"
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_children_user_id ON children(user_id);
```

---

#### 6.3 `toys`
```sql
CREATE TABLE toys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  age_range VARCHAR(20) NOT NULL, -- "0-1yr", "1-3yr", etc.
  condition VARCHAR(20) NOT NULL, -- "Like New", "Good", "Fair", "Well-Loved"
  brand VARCHAR(100),
  original_price VARCHAR(50), -- text field (e.g., "500k VND" or "$50")
  is_available BOOLEAN DEFAULT TRUE, -- marked for swap
  photos JSONB, -- ["url1", "url2", ...]
  swipe_count INTEGER DEFAULT 0, -- analytics
  match_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP -- soft delete
);

CREATE INDEX idx_toys_user_id ON toys(user_id);
CREATE INDEX idx_toys_available ON toys(is_available) WHERE deleted_at IS NULL;
CREATE INDEX idx_toys_age_range ON toys(age_range);
```

---

#### 6.4 `swipes`
```sql
CREATE TABLE swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swiper_id UUID REFERENCES users(id) ON DELETE CASCADE, -- who swiped
  toy_id UUID REFERENCES toys(id) ON DELETE CASCADE, -- toy swiped on
  toy_owner_id UUID REFERENCES users(id) ON DELETE CASCADE, -- owner of toy
  direction VARCHAR(10) NOT NULL, -- "right" or "left"
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(swiper_id, toy_id) -- can't swipe same toy twice
);

CREATE INDEX idx_swipes_swiper_id ON swipes(swiper_id);
CREATE INDEX idx_swipes_toy_owner_id ON swipes(toy_owner_id);
CREATE INDEX idx_swipes_direction ON swipes(direction);
```

---

#### 6.5 `matches`
```sql
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active', -- "active", "negotiating", "expired", "completed"
  created_at TIMESTAMP DEFAULT NOW(),
  expired_at TIMESTAMP, -- if no action within 7 days

  UNIQUE(user_a_id, user_b_id),
  CHECK (user_a_id < user_b_id) -- ensure consistent ordering
);

CREATE INDEX idx_matches_users ON matches(user_a_id, user_b_id);
CREATE INDEX idx_matches_status ON matches(status);
```

---

#### 6.6 `swap_proposals`
```sql
CREATE TABLE swap_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  proposer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  offered_toy_id UUID REFERENCES toys(id) ON DELETE CASCADE, -- what proposer gives
  requested_toy_id UUID REFERENCES toys(id) ON DELETE CASCADE, -- what proposer wants
  status VARCHAR(20) DEFAULT 'pending', -- "pending", "accepted", "countered", "declined"
  round_number INTEGER DEFAULT 1, -- 1, 2, or 3 (max 3 rounds)
  created_at TIMESTAMP DEFAULT NOW(),
  responded_at TIMESTAMP,
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '48 hours'
);

CREATE INDEX idx_proposals_match_id ON swap_proposals(match_id);
CREATE INDEX idx_proposals_recipient_id ON swap_proposals(recipient_id);
CREATE INDEX idx_proposals_status ON swap_proposals(status);
```

---

#### 6.7 `swaps`
```sql
CREATE TABLE swaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
  user_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_a_toy_id UUID REFERENCES toys(id) ON DELETE SET NULL,
  user_b_toy_id UUID REFERENCES toys(id) ON DELETE SET NULL,
  swap_code VARCHAR(6) NOT NULL UNIQUE, -- 6-digit code
  status VARCHAR(20) DEFAULT 'confirmed', -- "confirmed", "completed", "cancelled"
  user_a_confirmed BOOLEAN DEFAULT FALSE,
  user_b_confirmed BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_swaps_status ON swaps(status);
CREATE INDEX idx_swaps_user_a ON swaps(user_a_id);
CREATE INDEX idx_swaps_user_b ON swaps(user_b_id);
```

---

#### 6.8 `messages`
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swap_id UUID REFERENCES swaps(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_swap_id ON messages(swap_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
```

---

#### 6.9 `reports`
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  swap_id UUID REFERENCES swaps(id) ON DELETE SET NULL,
  reason VARCHAR(50) NOT NULL, -- "no_show", "rude", "misleading_photos", "other"
  details TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- "pending", "reviewed", "resolved"
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reports_reported_user ON reports(reported_user_id);
CREATE INDEX idx_reports_status ON reports(status);
```

---

#### 6.10 `ratings`
```sql
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swap_id UUID REFERENCES swaps(id) ON DELETE CASCADE,
  rater_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rated_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL, -- 1-5
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(swap_id, rater_id), -- can only rate once per swap
  CHECK (score >= 1 AND score <= 5)
);

CREATE INDEX idx_ratings_rated_user ON ratings(rated_user_id);
```

---

#### 6.11 `blocked_users`
```sql
CREATE TABLE blocked_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID REFERENCES users(id) ON DELETE CASCADE,
  blocked_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(blocker_id, blocked_user_id)
);

CREATE INDEX idx_blocked_blocker_id ON blocked_users(blocker_id);
```

---

### Key Queries (For Performance Testing)

```sql
-- Find toys available for browsing (by district, age range, exclude already swiped)
SELECT t.*
FROM toys t
JOIN users u ON t.user_id = u.id
WHERE t.is_available = TRUE
  AND t.deleted_at IS NULL
  AND u.district = 'District 2'
  AND t.age_range = ANY('{1-3yr, 3-5yr}')
  AND t.id NOT IN (
    SELECT toy_id FROM swipes WHERE swiper_id = $1
  )
  AND t.user_id != $1 -- exclude own toys
ORDER BY RANDOM()
LIMIT 50;

-- Check if mutual match exists (both users swiped right on each other's toys)
SELECT COUNT(*) > 0 AS has_mutual_match
FROM swipes s1
JOIN swipes s2 ON s1.swiper_id = s2.toy_owner_id
  AND s1.toy_owner_id = s2.swiper_id
WHERE s1.swiper_id = $1
  AND s1.toy_owner_id = $2
  AND s1.direction = 'right'
  AND s2.direction = 'right';

-- Get user's active matches with toy details
SELECT
  m.id AS match_id,
  m.created_at,
  u.name AS matched_user_name,
  u.profile_photo_url,
  u.trust_score,
  jsonb_agg(DISTINCT t_theirs.*) AS toys_they_liked,
  jsonb_agg(DISTINCT t_mine.*) AS toys_i_liked
FROM matches m
JOIN users u ON (u.id = m.user_a_id OR u.id = m.user_b_id) AND u.id != $1
JOIN swipes s_theirs ON s_theirs.swiper_id = u.id AND s_theirs.toy_owner_id = $1
JOIN toys t_theirs ON s_theirs.toy_id = t_theirs.id
JOIN swipes s_mine ON s_mine.swiper_id = $1 AND s_mine.toy_owner_id = u.id
JOIN toys t_mine ON s_mine.toy_id = t_mine.id
WHERE (m.user_a_id = $1 OR m.user_b_id = $1)
  AND m.status = 'active'
GROUP BY m.id, u.id;
```

---

## 7. Success Metrics

### 7.1 North Star Metric
**Completed Swaps per Month**

Target progression:
- Month 1: 10 swaps
- Month 2: 20 swaps
- Month 3: 40 swaps

---

### 7.2 Acquisition Metrics

| Metric | Target | Tracking |
|--------|--------|----------|
| **Landing page conversion** | 5%+ | Google Analytics |
| **App downloads** | 200+ in month 1 | App Store Connect, Play Console |
| **Sign-up completion rate** | 70%+ | Mixpanel funnel |
| **Profile completion rate** | 80%+ (name, district, child age) | Mixpanel |

---

### 7.3 Engagement Metrics

| Metric | Target | Tracking |
|--------|--------|----------|
| **First toy added** | 60%+ of users | Mixpanel |
| **Daily swipes per user** | 10+ swipes | Mixpanel |
| **Match rate** | 10%+ (swipes → matches) | Database query |
| **DAU (Daily Active Users)** | 30+ by month 3 | Mixpanel |
| **WAU (Weekly Active Users)** | 100+ by month 3 | Mixpanel |

---

### 7.4 Conversion Metrics (Critical Path)

**Swap Funnel:**
```
100 users sign up
→ 60 add at least 1 toy (60%)
→ 45 swipe on others' toys (75%)
→ 20 get at least 1 match (44%)
→ 12 complete negotiation (60%)
→ 6 complete swap (50%)

= 6% overall conversion (sign-up → swap)
```

**Targets:**
- Toy listing rate: 60%+
- Swipe rate: 70%+
- Match rate: 40%+
- Negotiation success: 50%+
- Swap completion: 50%+

---

### 7.5 Retention Metrics

| Metric | Target | Tracking |
|--------|--------|----------|
| **Day 1 retention** | 50%+ | Mixpanel cohorts |
| **Day 7 retention** | 30%+ | Mixpanel cohorts |
| **Day 30 retention** | 20%+ | Mixpanel cohorts |
| **Repeat swappers** | 30%+ do 2+ swaps | Database query |

---

### 7.6 Trust & Safety Metrics

| Metric | Target | Tracking |
|--------|--------|----------|
| **No-show rate** | < 20% | Database: swaps cancelled |
| **Report rate** | < 5% of swaps | Database: reports table |
| **Average trust score** | > 3.5 | Database: avg(trust_score) |
| **Blocked users** | < 10% of user base | Database: blocked_users |

---

### 7.7 Red Flags (Stop/Pivot Signals)

🚨 **If any of these happen, pivot or pause:**

- < 100 sign-ups in month 1 (low demand)
- < 30% add toys (onboarding broken)
- < 5% match rate (supply/demand mismatch)
- < 30% complete swaps after matching (friction too high)
- > 30% no-show rate (trust broken)
- > 50% churn after first swap (bad experience)

---

## 8. Development Timeline

### Phase 1: Foundation (Weeks 1-4)

**Week 1: Setup & Auth**
- [ ] Set up project (React Native + Expo)
- [ ] Set up Supabase (database, auth, storage)
- [ ] Set up GitHub repo + CI/CD
- [ ] Implement auth flow (phone/email/social)
- [ ] Implement onboarding screens

**Week 2: Core Data Models**
- [ ] Build toy listing flow (camera, upload, form)
- [ ] Build "My Toys" screen (list, edit, delete)
- [ ] Implement photo upload (Supabase Storage)
- [ ] Build profile screen

**Week 3: Browse & Swipe**
- [ ] Build Tinder-style swipe UI
- [ ] Implement swipe gestures
- [ ] Implement browse algorithm (filters)
- [ ] Implement toy detail modal

**Week 4: Matching Logic**
- [ ] Implement matching algorithm (mutual swipes)
- [ ] Build matches list screen
- [ ] Implement push notifications (basic)

---

### Phase 2: Swap Flow (Weeks 5-8)

**Week 5: Negotiation**
- [ ] Build swap proposal screen
- [ ] Implement proposal flow (propose, accept, counter)
- [ ] Implement expiry logic (3 rounds, 48 hrs)
- [ ] Notifications for proposals

**Week 6: Swap Execution**
- [ ] Generate swap codes
- [ ] Integrate Google Places API (meetup suggestions)
- [ ] Build swap completion flow
- [ ] Update toy availability after swap

**Week 7: Chat**
- [ ] Implement Supabase real-time chat
- [ ] Build chat UI (react-native-gifted-chat)
- [ ] Push notifications for messages
- [ ] Block/report users

**Week 8: Trust & Safety**
- [ ] Implement trust score calculation
- [ ] Build rating/review screen
- [ ] Build report flow
- [ ] Implement auto-suspend (trust < 1.0)

---

### Phase 3: Polish & Testing (Weeks 9-12)

**Week 9: Analytics & Notifications**
- [ ] Integrate Mixpanel (track all events)
- [ ] Implement all push notification triggers
- [ ] Build in-app notification center
- [ ] Add analytics to all screens

**Week 10: Testing & Bug Fixes**
- [ ] End-to-end testing (manual)
- [ ] Fix critical bugs
- [ ] Performance optimization (image loading, queries)
- [ ] Accessibility audit (screen readers, color contrast)

**Week 11: Beta Testing**
- [ ] Recruit 20 beta testers (Facebook groups)
- [ ] TestFlight (iOS) + Internal Testing (Android)
- [ ] Collect feedback via TypeForm
- [ ] Fix reported issues

**Week 12: Launch Prep**
- [ ] Finalize App Store listings (screenshots, description)
- [ ] Record demo video
- [ ] Create press kit
- [ ] Set up customer support (email, in-app)
- [ ] Submit to App Store & Play Store

---

### Timeline Summary

```
Week 1-4:  Foundation (Auth, Toys, Browse)
Week 5-8:  Swap Flow (Match, Negotiate, Complete)
Week 9-12: Polish & Launch

Total: 12 weeks (3 months)
```

---

## 9. Team & Roles

### Option A: Solo Founder (Bootstrapped)

**You (Founder):**
- Product management (define features)
- Project management (timeline, priorities)
- User research (talk to parents)
- Marketing (social media, ads)
- Customer support

**Hire contractors:**
- **1 Full-stack developer** (React Native + Node.js)
  - Rate: $30-50/hr (Vietnam) or $50-100/hr (Global)
  - Commitment: 30 hrs/week for 12 weeks = 360 hours
  - Cost: $10,800 - $36,000

- **1 UI/UX designer** (part-time)
  - Design onboarding, main screens, branding
  - Rate: $30-50/hr
  - Commitment: 40 hours total
  - Cost: $1,200 - $2,000

**Total team cost: $12,000 - $38,000**

---

### Option B: Co-Founder Team

**You (Founder/CEO):**
- Product, marketing, fundraising

**Technical Co-Founder (CTO):**
- Builds the app
- Manages infrastructure
- Equity: 30-40%

**Designer (Contract or Equity):**
- UI/UX design
- Branding
- Equity: 5-10% OR $2,000 contract

**Total cost: $2,000** (just designer, if CTO is equity-based)

---

### Option C: Small Team (Funded)

**Team of 3:**
- 1 Product Manager (you)
- 1 Full-stack developer
- 1 Designer

**Cost:**
- Developer: $4,000/month × 3 months = $12,000
- Designer: $3,000/month × 3 months = $9,000
- PM: $0 (you, sweat equity)

**Total: $21,000**

---

**Recommendation:** Start with **Option A** (solo + 1 contractor) for MVP. If traction is strong, raise funding and hire team for scale.

---

## 10. Budget & Costs

### Development Costs

| Item | Cost (Bootstrapped) | Cost (Funded) |
|------|---------------------|---------------|
| **Developer(s)** | $10,800 - $36,000 | $12,000 |
| **Designer** | $1,200 - $2,000 | $9,000 |
| **Total Dev** | $12,000 - $38,000 | $21,000 |

---

### Infrastructure Costs (Monthly)

| Service | Free Tier | Paid Tier (After Free) |
|---------|-----------|------------------------|
| **Supabase** | $0 (500MB DB) | $25/month (8GB DB) |
| **Backend Hosting** (Railway) | $5/month | $10-20/month |
| **Expo EAS Build** | $0 (limited) | $29/month (unlimited builds) |
| **Google Maps API** | $200 credit/month | $5 per 1,000 requests after |
| **Mixpanel** | $0 (100K events) | $0 (should stay free) |
| **Push Notifications** | $0 (Expo) | $0 |
| **Domain** (toyswap.app) | $12/year | $12/year |

**Total monthly: $17-46/month** depending on usage

**Year 1 estimate: $200-550**

---

### Marketing Costs (Pre-Launch + First 3 Months)

| Item | Cost |
|------|------|
| **Landing page** (Webflow/Carrd) | $0-50 |
| **Facebook Ads** (District 2 parents) | $500-1,000 |
| **Printed flyers** (cafes, schools) | $100-200 |
| **Referral incentives** (e.g., $5 vouchers) | $200-500 |
| **Beta tester gifts** (thank-you toys) | $100-200 |
| **Total Marketing** | $900-1,950 |

---

### Legal & Administrative

| Item | Cost |
|------|------|
| **Business registration** (Vietnam) | $50-200 |
| **Terms of Service** (lawyer review) | $500-1,000 |
| **Privacy Policy** (lawyer review) | $500-1,000 |
| **Insurance** (liability) | $200-500/year |
| **Total Legal** | $1,250-2,700 |

---

### Total Budget Summary

| Scenario | Development | Infrastructure (Y1) | Marketing | Legal | **Total** |
|----------|-------------|---------------------|-----------|-------|-----------|
| **Bootstrapped (Low)** | $12,000 | $200 | $900 | $1,250 | **$14,350** |
| **Bootstrapped (High)** | $38,000 | $550 | $1,950 | $2,700 | **$43,200** |
| **Funded** | $21,000 | $550 | $5,000 | $2,700 | **$29,250** |

---

**Realistic MVP Budget: $15,000 - $25,000**

---

## 11. Risk Mitigation

### Risk 1: Low User Acquisition
**Risk:** < 100 sign-ups in first month

**Mitigation:**
- Pre-launch waitlist (validate demand before building)
- Partner with expat Facebook group admins (endorsement)
- Offer early-bird incentive ("First 100 users get premium features free")
- Host launch event at District 2 cafe (in-person signups)

---

### Risk 2: Chicken-and-Egg (No Toys to Browse)
**Risk:** New users find no toys available → churn

**Mitigation:**
- Seed the platform: You + friends/family list 50 toys before launch
- Onboarding flow encourages listing toys FIRST before browsing
- "Add 3 toys to unlock browsing" requirement
- Show "toys coming soon" vs. empty state

---

### Risk 3: Geographic Fragmentation
**Risk:** Users spread across HCMC → Can't match (too far)

**Mitigation:**
- Launch District 2 ONLY (strict geo-fence)
- Marketing only targets District 2 parents
- App shows "Currently available in District 2 only" upfront
- Expand to other districts only after 200+ users in D2

---

### Risk 4: High No-Show Rate
**Risk:** Users agree to swap, but don't follow through

**Mitigation:**
- Trust score heavily penalizes no-shows (-1.0 points)
- Require phone verification (harder to create spam accounts)
- Send reminder notification 1 day before swap
- Encourage public meetup locations (less likely to flake)
- Show "last active" timestamp (inactive users = red flag)

---

### Risk 5: Safety Incidents
**Risk:** Harassment, theft, unsafe meetups

**Mitigation:**
- Never share phone numbers (in-app chat only)
- Suggest public meetup locations (cafes, malls)
- Require profile photo + verified phone number
- Block/report features prominent
- Zero-tolerance policy (immediate ban for harassment)
- Insurance policy (liability coverage)

---

### Risk 6: Poor Match Quality
**Risk:** Users match but can't agree on swap

**Mitigation:**
- Allow 3 rounds of negotiation (flexibility)
- Show "popular pairings" suggestions
- Track failed negotiations → Improve algorithm
- Consider "swap credits" system in V2 (handles asymmetry)

---

### Risk 7: App Store Rejection
**Risk:** Apple/Google rejects app

**Mitigation:**
- Follow App Store guidelines strictly (privacy policy, terms, content moderation)
- No in-app purchases in MVP (avoid payment complications)
- Clear age ratings (PEGI 3 / Everyone)
- Pre-submission checklist (screenshots, metadata, test accounts)

---

### Risk 8: Technical Failure at Scale
**Risk:** App crashes, database overload

**Mitigation:**
- Load testing before launch (simulate 500 concurrent users)
- Database indexing on critical queries (swipes, matches)
- Image optimization (compress photos to < 500KB)
- Monitoring: Sentry (error tracking), Datadog (performance)
- Supabase Pro tier (auto-scaling)

---

### Risk 9: Competitor Copies Your Idea
**Risk:** Cho Tot or Facebook Marketplace adds toy swap feature

**Mitigation:**
- Speed: Launch fast (12 weeks)
- Network effects: Lock in users early (hard to switch once they have matches)
- Community: Build tight District 2 parent community
- Unique features: Proactive nudging (log toys → remind to swap)
- Brand: Be THE toy swap app (focus, not general marketplace)

---

### Risk 10: Burn Out (Solo Founder)
**Risk:** You get overwhelmed and quit

**Mitigation:**
- Set realistic timeline (12 weeks, not 6)
- Hire help (don't code yourself unless technical)
- Join founder community (Vietnam startup Slack groups)
- Take weekends off
- Celebrate small wins (first user, first swap)

---

## 12. Go-to-Market Strategy

### Phase 1: Pre-Launch (Weeks -4 to 0)

**Goal: 200+ waitlist signups**

**Tactics:**
1. **Landing page** (Carrd or Webflow)
   - Headline: "Tinder for toys. Swap toys with parents in District 2."
   - Email capture + SMS (phone number)
   - Show demo video (animated mockups)
   - Estimated launch date

2. **Facebook Groups** (Organic + Paid)
   - Post in: "District 2 Expats", "Hanoi Massive", "HCMC Moms"
   - Message: "We're building an app to swap toys locally. Would you use this?"
   - Link to landing page
   - Run FB ads ($5/day) targeting parents in District 2

3. **In-Person Validation**
   - Go to District 2 cafes popular with families
   - Talk to 20 parents (guerrilla research)
   - Show mockups, get emails

**Success Criteria:** 200+ waitlist signups

---

### Phase 2: Beta Launch (Weeks 0-4)

**Goal: 50 active users, 10 completed swaps**

**Tactics:**
1. **Invite Waitlist** (Email + SMS)
   - "ToySwap is live! Download now and get early access."
   - TestFlight (iOS) / Internal Test (Android)
   - Personal onboarding: Video call with first 20 users

2. **Seed Toys**
   - You + 10 friends list 5 toys each = 50 toys live
   - Creates immediate "inventory" for new users

3. **Beta Tester Incentives**
   - "Complete 1 swap, get a $10 cafe voucher"
   - "Refer 3 friends, get a toy cleaning kit"

4. **In-Person Launch Event**
   - Rent space at District 2 cafe
   - "Toy Swap Launch Party"
   - Parents bring toys, swap in-person, download app
   - Instagram/Facebook coverage

**Success Criteria:** 50 users, 10 swaps

---

### Phase 3: Public Launch (Weeks 5-12)

**Goal: 200 users, 40 completed swaps/month**

**Tactics:**
1. **App Store Optimization (ASO)**
   - Title: "ToySwap - Swap Toys Locally"
   - Keywords: toy swap, toy exchange, parents, kids toys, District 2
   - Screenshots with clear value prop
   - Video preview (15 sec)

2. **Facebook Ads** (Paid)
   - Budget: $500/month
   - Target: Parents in District 2, ages 25-40
   - Creative: Video showing swipe UI
   - CTA: "Download now and swap your first toy"

3. **PR & Media**
   - Pitch to VietnamNet, VNExpress, Saigoneer
   - Angle: "New app helps HCMC parents save money and reduce waste"
   - Offer journalist exclusive early access

4. **Partnerships**
   - Cafes: "Official ToySwap meetup location" stickers
   - Preschools: Flyers in newsletters (with permission)
   - Toy stores: "Bought a new toy? Swap an old one!" cross-promotion

5. **Referral Program**
   - "Invite 3 friends → Unlock 'premium browsing' (see 100 toys/day)"
   - Share code in-app
   - Track via Mixpanel

6. **Content Marketing**
   - Blog: "5 benefits of toy swapping for your child"
   - Instagram: User-generated content (parents posting swaps)
   - Facebook Group: Create "ToySwap District 2 Community" group

**Success Criteria:** 200 users, 40 swaps/month

---

### Phase 4: Retention & Growth (Month 4+)

**Tactics:**
1. **Re-engagement Notifications**
   - "New toys added this week in District 2!"
   - "You haven't browsed in 7 days. See what's new!"

2. **Gamification**
   - Badges: "First Swap", "5 Swaps Club", "Top Swapper"
   - Leaderboard (opt-in): "Most active swappers this month"

3. **Events**
   - Monthly "Swap Party" at District 2 park
   - Build community beyond app

4. **Expansion**
   - District 7 (next largest expat area)
   - Hanoi (Tay Ho district)

---

## 13. Post-Launch Roadmap

### V1.1 (Month 4-6): Improvements Based on Feedback

**Likely features:**
- [ ] Vietnamese language support
- [ ] Filter toys by brand (e.g., "Show only LEGO")
- [ ] Wishlist ("Toys I'm looking for")
- [ ] Photo verification (timestamp, multiple angles)
- [ ] Video chat for toy inspection

---

### V2 (Month 7-12): Monetization & Scale

**Monetization options:**
1. **Buy/Sell Marketplace**
   - If no swaps available → List toy for sale
   - 5% commission on sales
   - Integrated payment (Stripe, Momo)

2. **Premium Subscription** ($5/month)
   - Unlimited swipes (free tier limited to 50/day)
   - Priority matching (your toys shown first)
   - See who liked your toys before matching
   - Verified badge

3. **Featured Listings** ($1-3 per toy)
   - Toy shown at top of browse feed for 24 hours

**Scale features:**
- [ ] Multi-toy bundle swaps (2-for-1)
- [ ] Shipping labels (partner with GrabExpress)
- [ ] AI recommendations ("Based on your child's age, you might like...")
- [ ] Expand to Hanoi, Da Nang

---

### V3 (Year 2): Platform Play

**Potential pivots:**
- [ ] Toy rental subscription (pivot to toy library model)
- [ ] Expand to other kids' items (clothes, books, gear)
- [ ] B2B: Partner with toy stores (trade-in program)
- [ ] Franchise model: ToySwap Cafes (physical locations)

---

## 14. Key Decisions Checkpoint

Before proceeding, confirm these decisions:

### ✅ Confirmed Decisions

1. **Platform:** React Native (iOS + Android)
2. **Backend:** Node.js + Supabase
3. **Matching:** Preference-based (no value system)
4. **Geography:** District 2, HCMC only
5. **Monetization:** Free for MVP
6. **Timeline:** 12 weeks to launch
7. **Budget:** $15,000 - $25,000
8. **Team:** Solo founder + 1 contractor developer
9. **Success metric:** 200 users, 20 swaps/month by month 3

### ❓ Open Questions (Need Your Input)

1. **Will you code this yourself or hire a developer?**
   - If hiring: What's your budget?
   - If coding: What's your React Native experience?

2. **Do you have any funding, or bootstrapping?**
   - Bootstrapped → Lower budget, longer timeline
   - Funded → Hire team, faster timeline

3. **What's your availability?**
   - Full-time: Can do 12 weeks
   - Part-time: Extend to 20 weeks

4. **Do you have a co-founder?**
   - Technical co-founder → Faster, no dev cost
   - Solo → Hire contractor

5. **Language preference?**
   - English only for MVP (faster)
   - Bilingual (English + Vietnamese) from day 1?

---

## 15. Next Immediate Steps

### This Week: Validation
1. [ ] Create landing page (Carrd, 2 hours)
2. [ ] Post in Facebook groups (District 2 Expats, HCMC parents)
3. [ ] Run $50 Facebook ads test (target District 2 parents)
4. [ ] Goal: 50 waitlist signups

**If < 20 signups → Reassess demand**
**If 50+ signups → Proceed to build**

---

### Week 2: Hire & Plan
1. [ ] Hire developer (Upwork, Toptal, or local Vietnam)
2. [ ] Set up project (GitHub, Supabase, Expo)
3. [ ] Create detailed spec doc for developer
4. [ ] Hire designer (99designs contest or Dribbble)

---

### Week 3-14: Build MVP
Follow development timeline (Section 8)

---

### Week 15: Beta Launch
1. [ ] Recruit 20 beta testers from waitlist
2. [ ] TestFlight + Internal Testing release
3. [ ] Collect feedback (TypeForm survey)

---

### Week 16: Public Launch
1. [ ] Submit to App Store + Play Store
2. [ ] Launch PR campaign
3. [ ] Facebook ads ($500 budget)
4. [ ] Host launch event (District 2)

---

## 16. Conclusion

**You have a strong, validated concept.** The preference-based matching model eliminates the biggest risk (value perception). The Vietnam market has a clear gap. District 2 expats are a perfect beachhead market.

**This implementation plan gives you:**
- ✅ Clear product spec (features, UX, database)
- ✅ Concrete tech stack (React Native + Supabase)
- ✅ Realistic timeline (12 weeks)
- ✅ Budget range ($15K-25K)
- ✅ Success metrics (200 users, 20 swaps/month)
- ✅ Risk mitigation strategies
- ✅ Go-to-market plan

**The next step is VALIDATION, not building.**

Spend $50 and 1 week on landing page + Facebook ads. If you get 50+ signups, you have demand. Then start building.

**Good luck! 🚀**

---

## Appendix A: Tech Stack Alternatives

### Frontend Alternatives

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| **React Native** | Cross-platform, large ecosystem | Slightly lower performance | ✅ Best for MVP |
| **Flutter** | Fast, beautiful UI, hot reload | Dart language (less common) | ⚠️ Good alternative |
| **Native (Swift + Kotlin)** | Best performance, native feel | 2x development time/cost | ❌ Overkill for MVP |

**Verdict: React Native** (faster, cheaper)

---

### Backend Alternatives

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| **Node.js + Supabase** | Fast, all-in-one, real-time | Less powerful for ML | ✅ Best for MVP |
| **Python + FastAPI** | Great for future ML/AI | Smaller real-time ecosystem | ⚠️ Good if ML-heavy later |
| **Firebase** | Zero backend code needed | Expensive at scale, NoSQL | ⚠️ Simpler but limiting |

**Verdict: Node.js + Supabase** (balanced)

---

## Appendix B: Estimated Costs Breakdown (Detail)

### Development (Bootstrapped)

| Task | Hours | Rate | Cost |
|------|-------|------|------|
| Auth & Onboarding | 40 | $40/hr | $1,600 |
| Toy Listing | 40 | $40/hr | $1,600 |
| Browse & Swipe | 60 | $40/hr | $2,400 |
| Matching Logic | 30 | $40/hr | $1,200 |
| Swap Negotiation | 50 | $40/hr | $2,000 |
| Chat | 40 | $40/hr | $1,600 |
| Trust & Safety | 30 | $40/hr | $1,200 |
| Polish & Testing | 70 | $40/hr | $2,800 |
| **Total Dev** | **360** | **$40/hr** | **$14,400** |

**+ Designer:** $1,500
**= Total: $15,900**

---

## Appendix C: Sample API Endpoints

```
Authentication:
POST   /auth/register
POST   /auth/login
POST   /auth/verify-phone
POST   /auth/logout

Users:
GET    /users/me
PUT    /users/me
GET    /users/:id
POST   /users/me/children

Toys:
GET    /toys (browse, with filters)
POST   /toys
GET    /toys/:id
PUT    /toys/:id
DELETE /toys/:id
GET    /users/me/toys

Swipes:
POST   /swipes (record swipe)
GET    /users/me/swipes

Matches:
GET    /matches (user's matches)
GET    /matches/:id

Swap Proposals:
POST   /matches/:matchId/proposals
PUT    /proposals/:id (accept/counter/decline)
GET    /proposals/:id

Swaps:
GET    /swaps (user's active swaps)
GET    /swaps/:id
POST   /swaps/:id/complete (mark complete)
POST   /swaps/:id/cancel

Messages:
GET    /swaps/:swapId/messages
POST   /swaps/:swapId/messages
PUT    /messages/:id/read

Reports:
POST   /reports

Ratings:
POST   /swaps/:swapId/ratings
```

---

**END OF IMPLEMENTATION PLAN**

Would you like me to:
1. Create user story cards for developer handoff?
2. Design the landing page copy?
3. Write the Facebook ad copy?
4. Create a Gantt chart for the 12-week timeline?
5. Draft the job posting to hire a React Native developer?
