# Review System - Quick Start Guide

## ✅ What's Been Added

A complete review system has been integrated into your SkySaver website with:

1. **Modern Review Form** - Professional, animated form component
2. **Supabase Integration** - Reviews are saved to Supabase database
3. **Dynamic Display** - Reviews are fetched and displayed in real-time
4. **Fallback Support** - Shows existing testimonials if no reviews are available

## 📁 Files Created

- `src/lib/supabase.ts` - Supabase client configuration
- `src/components/ReviewForm.tsx` - Review submission form
- `src/hooks/useReviews.ts` - Hook for fetching reviews
- `SUPABASE_SETUP.md` - Detailed setup instructions

## 🚀 Quick Setup (3 Steps)

### Step 1: Create Supabase Project
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Create a new project
3. Wait for it to finish setting up

### Step 2: Create Database Table
1. In Supabase dashboard, go to **SQL Editor**
2. Run this SQL:

```sql
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  savings TEXT,
  destination TEXT,
  quote TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Anyone can insert reviews" ON reviews FOR INSERT WITH CHECK (true);
```

### Step 3: Add Environment Variables
1. Create `.env` file in the `skysaver` folder
2. Add your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Get these values from: **Settings > API** in Supabase dashboard

## 🎨 Features

### Review Form
- ✅ Star rating (1-5 stars)
- ✅ Name, role, location fields
- ✅ Optional savings and destination
- ✅ Review text area
- ✅ Form validation
- ✅ Success/error messages
- ✅ Loading states
- ✅ Modern, animated UI matching your site design

### Review Display
- ✅ Fetches reviews from Supabase
- ✅ Shows initials in avatar circles
- ✅ Displays star ratings
- ✅ Shows savings and destination badges
- ✅ Relative date formatting (e.g., "2 days ago")
- ✅ Verified badge for verified reviews
- ✅ Smooth animations
- ✅ Fallback to existing testimonials

## 📍 Location

The review form and reviews are displayed in the **"Client Love"** section (`#ratings`) of your website.

## 🔒 Security

- Row Level Security (RLS) enabled
- Only SELECT and INSERT operations allowed for anonymous users
- Reviews start as unverified (`verified: false`)
- You can manually verify reviews in Supabase dashboard

## 🛠️ Customization

### To show only verified reviews:
Edit `src/hooks/useReviews.ts` and add a filter:

```typescript
const { data, error: fetchError } = await supabase
  .from('reviews')
  .select('*')
  .eq('verified', true)  // Add this line
  .order('created_at', { ascending: false });
```

### To change review form position:
Edit `src/App.tsx` and move the `<ReviewForm />` component to your desired location.

## 📝 Testing

1. Start your dev server: `npm run dev`
2. Navigate to the "Client Love" section
3. Fill out and submit a review
4. Check Supabase dashboard > Table Editor > reviews to see your submission

## ❓ Troubleshooting

**Reviews not showing?**
- Check browser console for errors
- Verify `.env` file has correct values
- Restart dev server after changing `.env`
- Check Supabase dashboard to see if reviews were inserted

**Form not submitting?**
- Check browser console for errors
- Verify Supabase table was created correctly
- Check RLS policies are set up

For detailed troubleshooting, see `SUPABASE_SETUP.md`

