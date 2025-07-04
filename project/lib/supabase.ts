import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
  console.error('Please check your .env file and ensure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY are set.');
  
  // Create a dummy client to prevent app crashes
  supabase = createClient('https://dummy.supabase.co', 'dummy-key', {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
} else {
  console.log('Supabase configuration:', {
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey
  });

  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  // Test the connection with proper error handling
  (async () => {
    try {
      const { error } = await supabase.from('users').select('count', { count: 'exact', head: true });
      if (error) {
        console.error('Supabase connection test failed:', error);
      } else {
        console.log('Supabase connection test successful');
      }
    } catch (err) {
      console.error('Supabase connection test error:', err);
    }
  })();
}

export { supabase };