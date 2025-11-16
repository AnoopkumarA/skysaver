# Supabase Setup Instructions

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `skysaver-reviews` (or any name you prefer)
   - Database Password: Choose a strong password
   - Region: Choose the closest region to your users
5. Click "Create new project" and wait for it to be set up

## Step 2: Create the Reviews Table

1. In your Supabase project dashboard, go to the **SQL Editor**
2. Click "New query"
3. Copy and paste the following SQL:

```sql
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT,
  location TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  savings TEXT,
  destination TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read reviews
CREATE POLICY "Anyone can read reviews" ON reviews FOR SELECT USING (true);

-- Create policy to allow anyone to insert reviews
CREATE POLICY "Anyone can insert reviews" ON reviews FOR INSERT WITH CHECK (true);
```

4. Click "Run" to execute the SQL
5. You should see a success message

## Step 3: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** > **API**
2. You'll find:
   - **Project URL**: Copy this value
   - **anon public** key: Copy this value (under "Project API keys")

## Step 4: Configure Environment Variables

1. In the `skysaver` folder, create a file named `.env`
2. Copy the contents from `.env.example` to `.env`
3. Replace the placeholder values with your actual Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

4. Save the file

## Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the "Client Love" section on your website
3. Try submitting a review using the form
4. Check your Supabase dashboard:
   - Go to **Table Editor** > **reviews**
   - You should see your submitted review

## Optional: Enable Email Verification (Recommended for Production)

If you want to verify reviews before they're displayed:

1. Go to **Table Editor** > **reviews**
2. Manually set `verified` to `true` for reviews you want to display
3. Or create a function to auto-verify reviews after moderation

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env` file is in the `skysaver` folder
- Restart your development server after creating/updating `.env`
- Check that variable names start with `VITE_`

### Error: "relation 'reviews' does not exist"
- Make sure you ran the SQL script in Step 2
- Check that you're connected to the correct Supabase project

### Reviews not showing up
- Check the browser console for errors
- Verify your Supabase API keys are correct
- Check the Supabase dashboard to see if reviews were inserted
- Make sure RLS policies are set up correctly

## Security Notes

- The `anon` key is safe to use in client-side code
- Row Level Security (RLS) is enabled to protect your data
- Only SELECT and INSERT operations are allowed for anonymous users
- For production, consider adding moderation before reviews are displayed

