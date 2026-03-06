import { Redirect } from 'expo-router';

// Entry point — redirect to welcome screen
export default function Index() {
  // TODO: Check auth state from supabase session
  // If logged in → redirect to (tabs)
  // If not → redirect to welcome
  const isLoggedIn = false;

  return <Redirect href={isLoggedIn ? '/(tabs)' : '/auth/welcome'} />;
}