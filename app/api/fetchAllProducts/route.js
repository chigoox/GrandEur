import Stripe from "stripe";
import { NextResponse } from "next/server";

export const revalidate = 60

export async function POST(request) {
  let data = await request.json();
  const { limit } = data
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const prices = await stripe.products.list({
    limit: limit,

  });
  return NextResponse.json(prices.data.reverse())
}

