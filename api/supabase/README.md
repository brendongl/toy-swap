# Database Migrations

This directory contains SQL migration files for the ToySwap database schema.

## Running Migrations

### Prerequisites
1. Set up your Supabase project (see `/SUPABASE_SETUP.md`)
2. Add database credentials to `/api/.env`:
   ```env
   DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
   ```

### Run all migrations
```bash
cd api
npm run migrate
```

This will execute all migration files in order.

## Migration Files

### 001_initial_schema.sql
Creates all database tables:
- `users` - User accounts and profiles
- `children` - Children associated with users
- `toys` - Toys listed for swapping
- `swipes` - User swipes on toys
- `matches` - Matched users
- `swap_proposals` - Specific swap proposals
- `swaps` - Confirmed swaps
- `messages` - Chat messages
- `reports` - User reports
- `ratings` - User ratings
- `blocked_users` - Blocked users

Also includes:
- Database indexes for performance
- Triggers for auto-updating timestamps
- Helper functions (swap code generation)

### 002_row_level_security.sql
Sets up Row Level Security (RLS) policies to ensure:
- Users can only modify their own data
- Users can view available toys from others
- Privacy protection for messages and swaps
- Proper access control for all tables

## Manual Migration (Alternative)

If the script doesn't work, you can manually run migrations via Supabase dashboard:

1. Go to your Supabase project
2. Click **SQL Editor** in sidebar
3. Copy contents of each migration file
4. Paste and click **Run**
5. Repeat for each migration file in order

## Creating New Migrations

1. Create a new file with naming convention:
   ```
   003_description_of_changes.sql
   ```

2. Add your SQL changes
3. Run migrations: `npm run migrate`

## Rollback

To rollback migrations, you'll need to:
1. Manually drop tables/policies via SQL Editor
2. Or restore from a database backup

Production note: Always test migrations in a development environment first!

## Troubleshooting

### "relation already exists"
- Tables already created
- Either drop tables first or skip this migration

### "permission denied"
- Check your DATABASE_URL includes correct password
- Ensure you're using the service role key in Supabase

### "syntax error"
- Check SQL syntax in migration file
- Ensure you're using PostgreSQL-compatible SQL

## Useful Queries

View all tables:
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

Check RLS status:
```sql
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
```

View all policies:
```sql
SELECT * FROM pg_policies;
```
