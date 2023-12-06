'use client'
import { getRand } from '@/app/myCodes/Util';
import { Skeleton } from "@nextui-org/react";
import { Dosis, Grandstander } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const font = Grandstander({ subsets: ['latin'], weight: ['400'] })
const font2 = Dosis({ subsets: ['latin'], weight: ['400'] })


function ShopItem({ shopItems, location = 'HotTools', onShopPage }) {
    const { name, images, metadata } = shopItems ? shopItems : {}
    const { price } = metadata
    const [productsLoaded, setProductsLoaded] = useState(false)
    // const stars = Array.apply(null, Array(rating))
    const awaitLoading = () => {
        setTimeout(() => {
            if (name) setProductsLoaded(true)
        }, getRand(500));
    }

    useEffect(() => {
        awaitLoading()
    }, [name])
    return (
        <Link href={`/Shop/${location}/${name.replace(/\s/g, '')}`} className='h-[20rem] fadeInZoomx2 flex-shrink-0  w-[11rem] md:h-[33rem]  md:w-[20rem]  my-2 shadow-sm shadow-black-800  border border-[#474747] hover:border-white hover:font-extrabold hover:border-2 trans  relative  rounded-lg overflow-hidden'>
            <Skeleton isLoaded={productsLoaded} className='w-full h-full bg-gray-400'>
                <Image width={1920} height={1080} quality={100} src={images[0]} className='h-[20rem] md:h-[33rem] w-full object-cover' alt="" />
                <div className='h-[30%] md:h-[20%] bg-gray-900 text-white bg-opacity-75 absolute bottom-0  w-full flex items-center flex-col p-2'>

                    <div className={'font.className'}>
                        <h1 className='md:text-xl text-sm   p-1 w-[95%] text-center max-h-16 overflow-hidden md:max-h-20 max-w'>{name.substr(0, 50)}{name.length > 50 ? '...' : ''}</h1>
                    </div>
                    <div className=' w-full center gap-1'>
                        <span className='font-extralight text-sm'>from</span><span className='text-2xl font-semibold'><h1 className={font2.className}><Skeleton isLoaded={price} className='rounded'>{price}</Skeleton></h1></span>
                    </div>

                </div>

                {/*  <div className='w-28 h-8 absolute rounded-full flex justify-end items-center p-2 top-[70%] right-4 bg-black bg-opacity-75'>
                {stars.map((star) => {
                    return (
                        <AiFillStar size={14} color='yellow' />
                    )
                })}


            </div> */}

            </Skeleton>
        </Link>
    )
}

export default ShopItem