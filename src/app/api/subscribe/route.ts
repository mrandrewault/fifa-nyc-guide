/**
 * /src/app/api/subscribe/route.ts
 * 
 * Next.js API route that handles email subscriptions via Beehiiv.
 * This runs server-side so your API key stays secret.
 * 
 * SETUP:
 * 1. In Vercel dashboard → your project → Settings → Environment Variables
 * 2. Add these two variables:
 *    BEEHIIV_API_KEY     = your API key from Beehiiv Settings → API
 *    BEEHIIV_PUB_ID      = your Publication ID (looks like pub_xxxxxxxx)
 * 3. Redeploy after adding env vars
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUB_ID;

  if (!apiKey || !pubId) {
    // Not configured yet — return success so UI works during development
    console.warn('Beehiiv env vars not set — skipping actual subscription');
    return NextResponse.json({ success: true });
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'golazo.nyc',
          utm_medium: 'organic',
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Beehiiv error');
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Beehiiv subscription error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
