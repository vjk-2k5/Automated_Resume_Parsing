// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the login page
  redirect('/home');  // Use lowercase
}