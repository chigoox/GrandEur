'use client'
import ShopItem from '@/app/Shop/Componets/ShopItem';
import { fetchProducts } from '@/app/myCodes/Stripe';
import { useEffect, useState } from 'react';

export const ProductsList = ({ category, limit, list, search }) => {
    const [productData, setProductData] = useState([])


    useEffect(() => {
        fetchProducts(category, setProductData, limit, search)

        return () => {
            null
        }
    }, [category])



    return (
        <div className='mt-12'>
            <div className={` ${list ? 'flex overflow-x-scroll gap-2 p-2 justify-start items-start  hidescroll border-black   w-full' : 'grid grid-flow-row grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 tems-center justify-items-center'} w-full m-auto`}>
                {productData.map(product => {
                    return (
                        <ShopItem key={product.id} location={(category == 'true') ? product.metadata.category : category} shopItems={product} />

                    )
                })}
            </div>
        </div>
    )
}

export default ProductsList



/* 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const products = await stripe.products.search({
        limit: limit ? limit : 25,
        query: `active:\'true\' AND metadata[\'${search ? search : 'category'}\']:\'${category}\'`,
    });

    const x = await stripe.products.list({
        limit: limit ? limit : 25,
    });
*/