import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { addToDoc } from "@/app/myCodes/Database";
import { serverTimestamp } from "firebase/firestore";
import { getRandTN } from "@/app/myCodes/Util";



export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const data = await request.json();
    const { productData, priceData } = data
    console.log(productData, priceData)
    const Price = productData.metadata.price
    const QYT = 1//

    console.log(productData.metadata)


    if (productData.metadata.category != 'Tobacco'
        && productData.metadata.category != 'Weed'
    ) {


        const product = await stripe.products.create(productData);

        if (priceData.length >= 1) {
            priceData.forEach(async (data, index) => {


                console.log(data)

                const price = await stripe.prices.create({
                    product: product.id,
                    metadata: {
                        price: Price,
                        for: product.name.replace(/\s/g, ''),
                        qty: QYT

                    },
                    nickname: Array.isArray(data) ? data[0] : data,
                    currency: 'USD',
                    unit_amount: Price * 100,
                })

                if (index == 0) {
                    stripe.products.update(product.id, {
                        default_price: price.id
                    })
                }

            })


        } else {
            const defaultPrice = await stripe.prices.create({
                product: product.id,
                metadata: {
                    price: product.metadata?.price,
                    for: product.name.replace(/\s/g, ''),
                    qty: product.metadata?.inventory

                },
                nickname: product.name,
                currency: 'USD',
                unit_amount: Price * 100,
            })
            stripe.products.update(product.id, {
                default_price: defaultPrice.id
            })
        }

        return NextResponse.json(product)

    } else {

        const id = getRandTN(10)

        await addToDoc('Products', `Prd_${id}`, {
            ...productData,
            variants: [...priceData],
            created: serverTimestamp(),
            default_price: `PriceID_${getRandTN(10)}`,
            id: `Prd_${id}`
        })
        return NextResponse.json({ status: 'OK POSTED TO FIREBASE' })

    }










}



/*  line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ], */