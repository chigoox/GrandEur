import { siteName } from "@/app/META";
import { isDev } from "@/app/myCodes/Util";
import { NextResponse } from "next/server";
import Stripe from "stripe";



export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    let { formData } = data
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'usd',
                unit_amount: 32000,
                product_data: {
                    name: 'Medical Marijuana Card',
                    description: 'state-issued identification card that enables a patient with a doctor\'s recommendation to obtain, possess, or cultivate cannabis for medicinal use.',
                    images: ['https://images.unsplash.com/photo-1590682751946-a65099676151?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
                },
            },
            quantity: 1,
        }],
        mode: 'payment',
        metadata: {
            name: formData?.name,
            email: formData?.email,
            dob: formData?.dob,
            phone: formData?.phone,
            type: 'medical'
        },
        success_url: `http://${!isDev() ? siteName?.replace(/\s/g, '').replace(/\'/g, '') + '.vercel.app' : 'localhost:3000'}/Medical/success`,
        cancel_url: `http://${!isDev() ? siteName?.replace(/\s/g, '').replace(/\'/g, '') + '.vercel.app' : 'localhost:3000'}`,
    });

    return NextResponse.json(session.url)
}



/*  line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ], */