import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { filterObject } from "@/app/myCodes/Util";
import { addToDoc } from "@/app/myCodes/Database";



export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const data = await request.json();
    const { productData } = data
    const filterFalsey = filterObject(productData, (p) => p)
    delete filterFalsey?.created
    delete filterFalsey?.object
    delete filterFalsey?.type
    delete filterFalsey?.id
    delete filterFalsey?.updated



    if (productData.metadata.category != 'Tobacco'
        && productData.metadata.category != 'Weed'
    ) {

        const product = await stripe.products.update(productData.id, filterFalsey);


        return NextResponse.json(product)

    } else {
        console.log(productData)
        await addToDoc('Products', productData.id, filterFalsey)
        return NextResponse.json({ status: 'OK, UPLOADED TO FIREBASE' })

    }


    /*  console.log(product)
     if (priceData.length >= 1) {
         priceData.forEach(async (data, index) => {
 
             if (true) {
                 console.log(data)
 //TODO FIX THIS SO ALL OLD PRICE ARE DELETED AND NEW ONES MADE
                 const price = await stripe.prices.update(product.default_price,{
                     product: product.id,
                     metadata: {
                         price: Price,
                         for: product.name.replace(/\s/g, ''),
                         qty: QYT
 
                     },
                     nickname: data,
                     currency: 'USD',
                     unit_amount: Price * 100,
                 })
 
                 if (index == 0) {
                     stripe.products.update(product.id, {
                         default_price: price.id
                     })
                 }
             }
         })
 
     } else {
         const defaultPrice = await stripe.prices.update(product.default_price,{
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
 
  */




}



/*  line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ], */