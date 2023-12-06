import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";



export async function POST (request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    let {productData, priceData} = data
    
    const {productName, productDesc,  price, img, productFeat, isNew, isBestSelling, category} = productData
    const priceINFO = Object.values(priceData)

    console.log(priceINFO[0])

    
    
    const product = await stripe.products.create({
         name: productName, //string
         description: productDesc,  //string
         metadata: {
            category:category,
            price:price,
            isnew:isNew ? isNew : false,
            isBestSeller:isBestSelling ? isBestSelling : false,
         }, //object
        images: img? img : [], //array
        features: [], //array
    });


 priceINFO.forEach(async (data, index) => {

        if (index !=0){
            const {priceName, amount} = data
            await stripe.prices.create({
        product: product.id,    
        metadata: {
            price:amount,
            for:productName.replace(/\s/g, '')

        },
        nickname: priceName,
        currency: 'USD',
        unit_amount: data.amount * 100,
        })
        }
    })

  

    return NextResponse.json(product)
}



/*  line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ], */