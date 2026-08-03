import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/vi'); // Redirect to the default locale (Vietnamese)
}