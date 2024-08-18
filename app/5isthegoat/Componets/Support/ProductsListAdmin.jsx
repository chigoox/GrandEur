import { useFetchDocsPresist } from '@/app/myCodes/Database'
import { fetchAllProducts } from '@/app/myCodes/Stripe'
import { createArray } from '@/app/myCodes/Util'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'

function ProductsListAdmin({ sortBy, window, setWidow, setSelectedProductData }) {
    const [products, setProducts] = useState([])


    useEffect(() => {
        const getData = async () => {
            const STRIPE_PRODUCTS = await fetchAllProducts(null, 108)
            let FIREBS_PRODUCTS

            await useFetchDocsPresist('Products', 'active', '!=', false, 'created', (data) => {
                FIREBS_PRODUCTS = data.map(i => {
                    const miliseconds = i.created.seconds * 1000 + i.created.nanoseconds / 1000000
                    return ({ ...i, created: miliseconds })
                })
                console.log(FIREBS_PRODUCTS)
                setProducts([...STRIPE_PRODUCTS, ...FIREBS_PRODUCTS])
            })
        }

        getData()
    }, [window])



    return (
        <div className='overflow-hidden h-96 sm:left-0 lg:left-0 md:left-2 relative hidescroll  overflow-y-scroll'>
            {products.filter(i => { return i.active }).sort((a, b) => { return (b.created - a.created) })?.map(item => {
                const active = item.active
                const name = item.name
                const inventory = item.metadata.inventory
                const image = item.images[0] || 'https://plus.unsplash.com/premium_photo-1677249227771-43a86c13eb76?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


                return (
                    <Button onPress={() => { setWidow('openEdit'); setSelectedProductData(item) }} className='grid grid-cols-3 mt-2 w-full h-auto'>
                        <div className='PRODUCT flex items-center gap-2'>
                            <img className='rounded-full object-cover h-14 w-14' src={image} alt="" />
                            <p>{name}</p>
                        </div>
                        <div className='STATUS h-full w-fit center'>
                            <div className={`rounded-full h-8 w-14 text-white ${active ? 'bg-green-600' : 'bg-gray-500'} center trans`}>{active ? 'Active' : 'Draft'}</div>
                        </div>
                        <div className='INVENTOR h-full w-24 center '>
                            <div className={` h-8  center trans`}>{inventory || 0} in stock</div>
                        </div>
                    </Button>
                )
            })}
        </div>
    )
}

export default ProductsListAdmin