import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import VikkiClient from './VikkiClient';

export default async function VikkiPage() {
  // Get token from headers in App Router
  const headersList = await headers();
  const authorization = headersList.get('authorization');

  if (!authorization) {
   notFound();
  }

  // Extract token (remove 'Bearer ' prefix if present)
  const token = authorization.replace('Bearer ', '');

  // You can verify token here if needed
  // const user = await verifyToken(token);

  return <VikkiClient token={token} />;
}