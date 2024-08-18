'use client'
import { getRand } from '@/app/myCodes/Util';
import { Button, Card, Skeleton } from "@nextui-org/react";
import { Dosis, Grandstander } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductView from './ProductView';
const font = Grandstander({ subsets: ['latin'], weight: ['400'] })
const font2 = Dosis({ subsets: ['latin'], weight: ['400'] })
export const MONEYFONT = font2

function ShopItem({ shopItems, location = 'HotTools', onShopPage }) {
    const { name, images, metadata } = shopItems ? shopItems : { name: 'Item', images: [] }
    const { price } = metadata || { price: 0 }
    const [productsLoaded, setProductsLoaded] = useState(false)
    const [ShowQuickView, setShowQuickView] = useState(false)
    // const stars = Array.apply(null, Array(rating))
    const awaitLoading = () => {
        setTimeout(() => {
            if (name) setProductsLoaded(true)
        }, getRand(500));
    }

    const toggleQuickView = () => {
        console.log(shopItems)
        if (ShowQuickView == false) return setShowQuickView(shopItems)
        setShowQuickView(false)
    }

    useEffect(() => {
        awaitLoading()
    }, [name])
    return (
        <div className='h-64   fadeInZoomx2 flex-shrink-0 m-auto  w-40 md:h-64  md:w-64  my-2 shadow-sm shadow-black-800   border-[#474747] hover:border-white hover:font-extrabold    relative   overflow-hidden'>
            <ProductView
                showShopView={ShowQuickView}
                setShowShopView={setShowQuickView}
            />
            <div className='group'>
                <Link className='center-col ' href={`/Shop/${location}/${name?.replace(/\s/g, '')}`}>
                    <Skeleton isLoaded={productsLoaded} className='w-auto h-auto rounded-full bg-gray-400 '>
                        <Card className={'h-40 w-40 border-4 relative rounded-full overflow-hidden bg-black'}>
                            <Image width={1920} height={1080} quality={100} src={images[0]} className=' m-auto h-full w-full object-cover' alt="" />
                            <div className={'font.className absolute bg-black trans bg-opacity-50 hover:bg-opacity-0 h-full w-full center'}>
                                <h1 className='md:text-lg group-hover:bg-black text-white  w-60  p-1  text-center max-h-16 overflow-hidden md:max-h-20'>{name.substr(0, 50)}{name.length > 50 ? '...' : ''}</h1>
                            </div>
                        </Card>
                    </Skeleton>
                    <div className='h-[30%] md:h-[20%] bg-opacity-75  bottom-0  w-full flex items-center flex-col p-2'>
                        <div className=' w-full center gap-1'>
                            <span className='font-extralight text-sm'>$</span><span className='text-2xl font-semibold'>
                                <Skeleton isLoaded={productsLoaded} className='w-auto h-auto bg-gray-400 '>
                                    <h1 className={font2.className}><Skeleton isLoaded={price} className='rounded'>{price}</Skeleton></h1>

                                </Skeleton>
                            </span>
                        </div>

                    </div>
                </Link>
                <Button onPress={(event) => { toggleQuickView(event) }} className='w-fit m-auto  font-bold block md:hidden md:group-hover:block   hover:bg-black-800 '>
                    Add to cart
                </Button>

                {/*  <div className='w-28 h-8 absolute rounded-full flex justify-end items-center p-2 top-[70%] right-4 bg-black bg-opacity-75'>
                {stars.map((star) => {
                    return (
                        <AiFillStar size={14} color='yellow' />
                    )
                })}


            </div> */}

            </div>


        </div>
    )
}

export default ShopItem