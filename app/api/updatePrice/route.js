


import { NextResponse } from "next/server";
import Stripe from "stripe";



export async function POST (request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    let {priceID, priceData} = data
    
    
    const price = await stripe.prices.update(priceID,
  {metadata: {order_id: '6735'}}
);

  

    return NextResponse.json(product)
}


