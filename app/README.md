# ToySwap Web App

This is the web-based MVP for ToySwap, built with Next.js 15, TypeScript, and Tailwind CSS. The app is designed to be easily portable to React Native for iOS and Android.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage

## 📁 Project Structure

```
app/
├── app/                        # Next.js app directory
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   ├── auth/                  # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── callback/
│   └── dashboard/             # Protected dashboard (to be built)
├── components/                 # React components
│   ├── ui/                    # UI components (Button, Input, Card, etc.)
│   ├── auth/                  # Auth components
│   ├── toys/                  # Toy-related components
│   ├── swipe/                 # Swipe interface components
│   └── ...
├── lib/                       # Utilities and configurations
│   ├── supabase/              # Supabase client & config
│   ├── hooks/                 # Custom React hooks
│   ├── stores/                # Zustand stores
│   └── utils/                 # Utility functions
├── types/                     # TypeScript type definitions
└── public/                    # Static assets
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)
- Git

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon key
4. Run the database schema:
   - Go to SQL Editor in Supabase
   - Copy the contents of `lib/supabase/schema.sql`
   - Run the SQL script

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the following values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Available Pages

- `/` - Landing page
- `/auth/login` - Login page
- `/auth/signup` - Sign up page
- `/dashboard` - Dashboard (to be built)

## 🔑 Key Features Implemented

### Phase 1 (Current)
- ✅ Project setup with Next.js + TypeScript + Tailwind
- ✅ Supabase integration (client, server, middleware)
- ✅ Complete database schema
- ✅ Authentication system (email, password, OAuth)
- ✅ Beautiful landing page
- ✅ Auth pages (login, signup)
- ✅ Zustand stores for state management
- ✅ React Query for server state
- ✅ Reusable UI components
- ✅ Custom hooks for auth and toys

### Phase 2 (Next Steps)
- ⏳ Dashboard with navigation
- ⏳ Toy listing functionality
- ⏳ Tinder-style swipe interface
- ⏳ Matching system
- ⏳ Swap negotiation flow
- ⏳ Real-time chat
- ⏳ Profile management
- ⏳ Trust scoring

## 📱 Mobile Portability

This app is built with mobile portability in mind:

1. **Component Architecture**: Components are built to be easily adaptable to React Native
2. **Separation of Concerns**: Business logic is separated from UI components
3. **Shared Types**: TypeScript types can be shared between web and mobile
4. **API Layer**: The same Supabase backend works for both web and mobile

### Converting to React Native

When ready to build the mobile apps:

1. Create a React Native project with Expo
2. Copy the `lib/`, `types/`, and business logic
3. Rebuild UI components using React Native components
4. Use the same Supabase client
5. The database, auth, and API remain unchanged

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## 📚 Documentation

All project documentation is in the `/docs` folder of the parent directory:

- [Implementation Plan](../docs/implementation-plan.md) - Complete technical specification
- [Database Schema](lib/supabase/schema.sql) - PostgreSQL schema with RLS
- [API Documentation](../docs/api-documentation.md) - API endpoints (to be created)

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for all protected routes
- Secure password hashing via Supabase Auth
- HTTPS enforced in production
- Environment variables for sensitive data

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

## 🤝 Contributing

This is currently a private project. Contribution guidelines will be added later.

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

## 🆘 Support

For issues or questions:
- Check the [Implementation Plan](../docs/implementation-plan.md)
- Review the database schema in `lib/supabase/schema.sql`
- Open an issue in the GitHub repository

---

**Built with ❤️ for parents in District 2, HCMC**
