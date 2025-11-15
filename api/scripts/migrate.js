const fs = require('fs');
const path = require('path');
const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL, {
  max: 1,
});

async function runMigrations() {
  const migrationsDir = path.join(__dirname, '../supabase/migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  console.log('🚀 Running database migrations...\n');

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const filePath = path.join(migrationsDir, file);
    const migration = fs.readFileSync(filePath, 'utf8');

    console.log(`📄 Running migration: ${file}`);

    try {
      await sql.unsafe(migration);
      console.log(`✅ ${file} completed successfully\n`);
    } catch (error) {
      console.error(`❌ Error in ${file}:`, error.message);
      process.exit(1);
    }
  }

  console.log('✨ All migrations completed successfully!');
  await sql.end();
  process.exit(0);
}

runMigrations().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
