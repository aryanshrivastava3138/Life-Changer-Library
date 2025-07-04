# Life Changer Library Management System

A comprehensive library management system built with Expo and Supabase for managing student admissions, seat bookings, attendance tracking, and payments.

## Features

- **User Authentication**: Secure registration and login system
- **Student Admission**: Complete admission form with course selection and shift preferences
- **Seat Booking**: Interactive seat selection for different time shifts
- **Attendance Tracking**: Check-in/check-out system for library visits
- **Payment Management**: UPI-based payment system with QR codes
- **Profile Management**: User profile and payment history

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [Supabase](https://supabase.com)
2. Go to Settings > API in your Supabase dashboard
3. Copy your Project URL and anon public key
4. Update the `.env` file with your credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Database Setup

Run the migration files in your Supabase SQL editor in order:

1. `supabase/migrations/001_create_users_table.sql`
2. `supabase/migrations/002_create_admissions_table.sql`
3. `supabase/migrations/003_create_seat_bookings_table.sql`
4. `supabase/migrations/004_create_attendance_table.sql`
5. `supabase/migrations/005_create_payment_history_table.sql`

### 3. Authentication Setup

In your Supabase dashboard:
1. Go to Authentication > Settings
2. Disable "Enable email confirmations" for development
3. Configure any additional auth providers if needed

### 4. Row Level Security

All tables have Row Level Security (RLS) enabled with appropriate policies:
- Users can only access their own data
- Admins have broader access where appropriate
- Public read access for seat availability

## Database Schema

### Users Table
- Stores user profiles linked to Supabase Auth
- Includes role-based access (student/admin)

### Admissions Table
- Complete student admission details
- Course information and shift preferences
- Payment status tracking

### Seat Bookings Table
- Seat reservation system
- Shift-based booking with date tracking
- Prevents double booking

### Attendance Table
- Check-in/check-out tracking
- Shift-based attendance records
- Historical attendance data

### Payment History Table
- Complete payment transaction records
- Receipt number generation
- Duration and amount tracking

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open the app in your browser or Expo Go app

## Deployment

This app can be deployed to:
- Expo Application Services (EAS)
- Vercel (for web)
- Netlify (for web)

Make sure to update your environment variables in your deployment platform.

## Security Features

- Row Level Security on all database tables
- Secure authentication with Supabase Auth
- Input validation and sanitization
- Role-based access control
- Secure payment processing

## Support

For issues or questions, please check the documentation or contact the development team.