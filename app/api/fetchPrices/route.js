import Stripe from "stripe";
import { NextResponse } from "next/server";

export const revalidate = 60


export async function POST(request) {
  let data = await request.json();
const {name} = data
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const prices = await stripe.prices.search({
        limit: 25,
        query: `active:\'true\' AND metadata[\'for\']:\'${name}\'`,
    });
    const pricesall = await stripe.prices.list({
        limit: 999,
    });

    pricesall.data.map((i) => {
    
   })
    const arrayPrice = prices.data.map((i) => {
    return i
   })
   
    return NextResponse.json(arrayPrice.reverse())
}

