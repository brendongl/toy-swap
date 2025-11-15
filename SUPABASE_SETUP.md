# Supabase Setup Guide

This guide will walk you through setting up Supabase for the ToySwap project.

---

## 1. Create Supabase Project

### Step 1: Sign up for Supabase
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email

### Step 2: Create a new project
1. Click "New Project"
2. Fill in project details:
   - **Name**: ToySwap
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Singapore (closest to Vietnam)
   - **Pricing Plan**: Free (for development)
3. Click "Create new project"
4. Wait 2-3 minutes for setup to complete

---

## 2. Get Your API Keys

### Find your project credentials:
1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** tab
3. Copy the following values:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Add to environment files:

**Mobile app** (`/app/.env`):
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Backend API** (`/api/.env`):
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
DATABASE_URL=postgresql://postgres:your-db-password@db.your-project-id.supabase.co:5432/postgres
```

---

## 3. Database Setup

### Get Database Connection String:
1. Go to **Project Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **URI** tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password

### Run Database Migrations:
```bash
cd api
npm run migrate
```

This will create all necessary tables (users, toys, swipes, matches, swaps, etc.)

---

## 4. Enable Authentication

### Step 1: Configure Auth Settings
1. Go to **Authentication** → **Settings**
2. Enable the following providers:

#### Email Authentication (Default)
- ✅ Enable email confirmation (recommended for production)
- For development: Disable email confirmation

#### Phone Authentication (Recommended for Vietnam market)
1. Click **Phone** tab
2. Enable phone authentication
3. Choose SMS provider:
   - **Twilio** (recommended)
   - **MessageBird**
   - **Vonage**
4. Add provider credentials

#### Social Authentication (Optional)
- **Facebook** (popular in Vietnam)
  - Go to Facebook Developers
  - Create app, get App ID and Secret
  - Add to Supabase
- **Google**
  - Go to Google Cloud Console
  - Create OAuth credentials
  - Add to Supabase

### Step 2: Configure Email Templates
1. Go to **Authentication** → **Email Templates**
2. Customize:
   - Confirmation email
   - Password reset email
   - Magic link email

---

## 5. Storage Setup (for Toy Photos)

### Step 1: Create Storage Bucket
1. Go to **Storage**
2. Click **Create bucket**
3. Bucket details:
   - **Name**: `toy-photos`
   - **Public**: Yes (photos need to be viewable)
   - **File size limit**: 5 MB
4. Click **Create bucket**

### Step 2: Set Storage Policies
1. Click on `toy-photos` bucket
2. Click **Policies** tab
3. Add policies:

#### Allow authenticated users to upload:
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'toy-photos');
```

#### Allow everyone to view:
```sql
CREATE POLICY "Anyone can view toy photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'toy-photos');
```

#### Allow users to update their own photos:
```sql
CREATE POLICY "Users can update own photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (auth.uid()::text = (storage.foldername(name))[1]);
```

---

## 6. Row Level Security (RLS)

RLS policies will be applied via migrations. To verify they're enabled:

1. Go to **Database** → **Tables**
2. For each table, check that RLS is enabled
3. View policies by clicking table → **Policies** tab

### Key policies:
- **users**: Can only read/update own profile
- **toys**: Can CRUD own toys, read others' available toys
- **swipes**: Can create own swipes, read match-related swipes
- **matches**: Can read matches you're part of
- **messages**: Can read/send messages for your swaps

---

## 7. Real-time Configuration

### Enable real-time for chat:
1. Go to **Database** → **Replication**
2. Enable real-time for these tables:
   - ✅ `messages`
   - ✅ `matches`
   - ✅ `swaps`

### Test real-time:
```typescript
// In your app
supabase
  .channel('messages')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
  }, payload => {
    console.log('New message:', payload);
  })
  .subscribe();
```

---

## 8. Extensions

Enable these PostgreSQL extensions:

1. Go to **Database** → **Extensions**
2. Enable:
   - ✅ `postgis` (for geospatial queries - nearby users)
   - ✅ `pg_stat_statements` (performance monitoring)
   - ✅ `uuid-ossp` (UUID generation)

---

## 9. Database Functions (Optional)

For complex operations, you can create database functions.

Example: Check for mutual match
```sql
CREATE OR REPLACE FUNCTION check_mutual_match(
  user_a UUID,
  user_b UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  mutual_swipes INTEGER;
BEGIN
  SELECT COUNT(*) INTO mutual_swipes
  FROM swipes s1
  JOIN swipes s2 ON s1.swiper_id = s2.toy_owner_id
    AND s1.toy_owner_id = s2.swiper_id
  WHERE s1.swiper_id = user_a
    AND s1.toy_owner_id = user_b
    AND s1.direction = 'right'
    AND s2.direction = 'right';

  RETURN mutual_swipes > 0;
END;
$$ LANGUAGE plpgsql;
```

---

## 10. Testing Your Setup

### Test Database Connection:
```bash
cd api
npm run dev
# Should see: "✅ Database connected successfully"
```

### Test Auth:
```bash
# In mobile app
npm start
# Try signing up with email
```

### Test Storage:
```bash
# Upload a test image from the app
# Check Storage tab in Supabase dashboard
```

---

## 11. Monitoring & Logs

### View Logs:
1. Go to **Logs** in Supabase dashboard
2. Available logs:
   - **API**: All API requests
   - **Auth**: Login attempts, sign-ups
   - **Database**: SQL queries
   - **Storage**: File uploads/downloads

### Set up Alerts (Pro plan):
1. Go to **Database** → **Roles**
2. Configure connection pooling
3. Set up email alerts for:
   - High CPU usage
   - Storage limit reached
   - Failed login attempts

---

## 12. Production Considerations

### Before launching:

1. **Enable Email Confirmation**
   - Authentication → Settings → Enable email confirmation

2. **Set up Custom SMTP** (optional)
   - Use SendGrid, Mailgun, or AWS SES
   - More reliable than Supabase's default mailer

3. **Upgrade to Pro Plan** ($25/month)
   - 8 GB database (vs 500 MB free)
   - Daily backups
   - No pausing after 1 week inactivity

4. **Enable SSL for Database**
   - Already enabled by default

5. **Set up Database Backups**
   - Automatic on Pro plan
   - Manual: Database → Backups → Download

---

## 13. Troubleshooting

### "Failed to connect to database"
- Check `DATABASE_URL` in `.env`
- Verify database password
- Check if your IP is allowed (Supabase allows all by default)

### "Invalid API key"
- Regenerate keys: Project Settings → API → Reset keys
- Update `.env` files

### "Storage upload failed"
- Check bucket policies
- Verify bucket is public
- Check file size (< 5 MB)

### "RLS policy violation"
- Check user is authenticated
- Verify policies in Supabase dashboard
- Run migrations again

---

## 14. Useful Supabase CLI Commands

Install Supabase CLI:
```bash
npm install -g supabase
```

Link to your project:
```bash
supabase link --project-ref your-project-id
```

Pull database schema:
```bash
supabase db pull
```

Generate TypeScript types:
```bash
supabase gen types typescript --project-id your-project-id > types/supabase.ts
```

---

## 15. Next Steps

✅ Supabase setup complete!

Now:
1. Run database migrations: `npm run migrate`
2. Test authentication in mobile app
3. Upload a test toy photo
4. Start building features!

---

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [PostGIS Extension](https://supabase.com/docs/guides/database/extensions/postgis)

---

**Last Updated**: November 2025
