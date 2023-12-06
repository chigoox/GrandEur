'use client'

import useFilterEmptyCategory from '@/app/Hooks/useFilterCategory'
import ProductsList from '@/app/Shop/Componets/ProductsList'
import Link from 'next/link'
import React from 'react'

const ShopSection = ({ category, name }) => {
    return (
        <div className='text-3xl overflow-x-scroll hidescroll text-white bg-black'>
            <Link href={`/Shop/${category}`} className='center relative font-extralight top-12 underline'>
                {name}
            </Link>
            <ProductsList category={category} limit={4} list />
        </div>
    )

}



export default function ShopProductlist() {
    return (
        <div>{useFilterEmptyCategory().map(category => {
            return (

                <ShopSection key={category} category={category.replace(/\s/g, '')} name={category} />
            )
        })}</div>
    )
}

